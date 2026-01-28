const { exec } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

// Configuration
const WATCH_PATTERNS = [
  '*.html',
  '*.css',
  '*.js',
  '*.json'
];

const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  '*.log'
];

const GIT_BRANCH = 'master';
const COMMIT_MESSAGE_PREFIX = 'Auto-update:';

// Debounce timer
let commitTimer = null;
const DEBOUNCE_DELAY = 2000; // Wait 2 seconds after last change before committing

// Track changed files
const changedFiles = new Set();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: __dirname, ...options }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function commitAndPush() {
  if (changedFiles.size === 0) return;

  const files = Array.from(changedFiles);
  const fileList = files.map(f => path.basename(f)).join(', ');
  
  log(`\n📝 Changes detected in: ${fileList}`, 'cyan');
  log('🔄 Committing and pushing to GitHub...', 'yellow');

  try {
    // Stage all changes
    await execCommand('git add -A');
    log('✓ Files staged', 'green');

    // Create commit message with timestamp and file list
    const timestamp = new Date().toLocaleString();
    const commitMessage = `${COMMIT_MESSAGE_PREFIX} ${fileList} - ${timestamp}`;
    
    // Commit
    await execCommand(`git commit -m "${commitMessage}"`);
    log(`✓ Committed: ${commitMessage}`, 'green');

    // Push to GitHub
    const { stdout, stderr } = await execCommand(`git push origin ${GIT_BRANCH}`);
    if (stdout) log(stdout, 'blue');
    if (stderr && !stderr.includes('Everything up-to-date')) {
      log(stderr, 'yellow');
    }
    
    log('✓ Pushed to GitHub successfully!', 'green');
    log(`🌐 Repository: https://github.com/achristiangamenight-cell/GameNight.git`, 'cyan');
    log(`🚀 GitHub Pages: https://achristiangamenight-cell.github.io/GameNight/`, 'cyan');
    log(`⏳ Deployment in progress... (usually takes 1-2 minutes)\n`, 'yellow');

    // Clear changed files
    changedFiles.clear();

  } catch (err) {
    if (err.stderr && err.stderr.includes('nothing to commit')) {
      log('ℹ No changes to commit', 'yellow');
      changedFiles.clear();
    } else {
      log(`✗ Error: ${err.error?.message || err.stderr || 'Unknown error'}`, 'red');
      log('⚠ Continuing to watch for changes...\n', 'yellow');
    }
  }
}

function scheduleCommit(filePath) {
  changedFiles.add(filePath);
  
  // Clear existing timer
  if (commitTimer) {
    clearTimeout(commitTimer);
  }

  // Schedule commit after debounce delay
  commitTimer = setTimeout(() => {
    commitAndPush();
  }, DEBOUNCE_DELAY);
}

// Start file watcher
log('🚀 Starting file watcher...', 'cyan');
log('📁 Watching for changes in: HTML, CSS, JS, JSON files', 'blue');
log('⏱ Debounce delay: 2 seconds\n', 'yellow');

const watcher = chokidar.watch(WATCH_PATTERNS, {
  ignored: IGNORE_PATTERNS,
  persistent: true,
  ignoreInitial: true,
  cwd: __dirname
});

watcher
  .on('add', filePath => {
    log(`➕ File added: ${filePath}`, 'green');
    scheduleCommit(filePath);
  })
  .on('change', filePath => {
    log(`📝 File changed: ${filePath}`, 'yellow');
    scheduleCommit(filePath);
  })
  .on('unlink', filePath => {
    log(`🗑 File deleted: ${filePath}`, 'red');
    scheduleCommit(filePath);
  })
  .on('error', error => {
    log(`✗ Watcher error: ${error}`, 'red');
  })
  .on('ready', () => {
    log('✅ File watcher ready!\n', 'green');
    log('💡 Tip: Make changes to HTML, CSS, or JS files to auto-commit and push\n', 'cyan');
  });

// Handle process termination
process.on('SIGINT', () => {
  log('\n\n🛑 Stopping file watcher...', 'yellow');
  
  // Commit any pending changes before exit
  if (changedFiles.size > 0) {
    log('📝 Committing pending changes...', 'yellow');
    commitAndPush().then(() => {
      watcher.close();
      process.exit(0);
    });
  } else {
    watcher.close();
    process.exit(0);
  }
});

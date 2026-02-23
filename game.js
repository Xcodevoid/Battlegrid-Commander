// BattleGrid Command v2.0 - Complete Game Logic

// ==================== UNIT DEFINITIONS ====================
const UNIT_TYPES = {
    // Melee units - short range
    knight: { name: 'Knight', hp: 100, attack: 15, range: 5, speed: 1.5, attackSpeed: 1000, icon: '🗡️', color: 0x888888, weapon: 'sword_shield', armor: 'heavy', isRanged: false },
    archer: { name: 'Archer', hp: 60, attack: 20, range: 80, speed: 1.2, attackSpeed: 1500, icon: '🏹', color: 0x228B22, weapon: 'bow', armor: 'light', isRanged: true },
    warrior: { name: 'Warrior', hp: 110, attack: 18, range: 5, speed: 1.4, attackSpeed: 900, icon: '⚔️', color: 0xCC6600, weapon: 'sword', armor: 'medium', isRanged: false },
    soldier: { name: 'Soldier', hp: 120, attack: 12, range: 5, speed: 1.0, attackSpeed: 1100, icon: '🛡️', color: 0x556B2F, weapon: 'sword_shield', armor: 'medium', isRanged: false },
    pikeman: { name: 'Pikeman', hp: 80, attack: 25, range: 12, speed: 1.0, attackSpeed: 1200, icon: '🔱', color: 0xDAA520, weapon: 'spear', armor: 'light', isRanged: false },
    mage: { name: 'Mage', hp: 50, attack: 28, range: 50, speed: 0.8, attackSpeed: 2000, icon: '🔮', color: 0x6A0DAD, weapon: 'staff', armor: 'robes', isRanged: true },
    healer: { name: 'Healer', hp: 70, attack: 5, heal: 15, range: 30, speed: 1.0, attackSpeed: 2500, icon: '💚', color: 0xFF69B4, weapon: 'healer_staff', armor: 'robes', isRanged: true },
    barbarian: { name: 'Barbarian', hp: 90, attack: 30, range: 5, speed: 1.3, attackSpeed: 800, icon: '🪓', color: 0x8B4513, weapon: 'axe', armor: 'light', isRanged: false },
    guardian: { name: 'Guardian', hp: 140, attack: 10, range: 5, speed: 0.7, attackSpeed: 1500, icon: '🛡️', color: 0x4682B4, weapon: 'sword_shield', armor: 'heavy', isRanged: false },
    dragon: { name: 'Dragon', hp: 180, attack: 45, range: 15, speed: 1.5, attackSpeed: 2000, icon: '🐉', color: 0xFF4500, weapon: 'dragon', armor: 'beast', isRanged: false },
    // Add more unit types with proper ranges
    crossbowman: { name: 'Crossbowman', hp: 60, attack: 25, range: 60, speed: 1.0, attackSpeed: 1800, icon: '🎯', color: 0x228B22, weapon: 'crossbow', armor: 'light', isRanged: true },
    longbowman: { name: 'Longbowman', hp: 55, attack: 30, range: 100, speed: 1.1, attackSpeed: 2000, icon: '🎯', color: 0x228B22, weapon: 'longbow', armor: 'light', isRanged: true },
    slinger: { name: 'Slinger', hp: 50, attack: 15, range: 40, speed: 1.3, attackSpeed: 1000, icon: '🪨', color: 0x8B7355, weapon: 'sling', armor: 'light', isRanged: true },
    javelineer: { name: 'Javelineer', hp: 65, attack: 20, range: 35, speed: 1.1, attackSpeed: 1200, icon: '🔻', color: 0xDAA520, weapon: 'javelin', armor: 'light', isRanged: true },
    berserker: { name: 'Berserker', hp: 80, attack: 35, range: 5, speed: 1.5, attackSpeed: 600, icon: '😡', color: 0x8B4513, weapon: 'dual_axe', armor: 'light', isRanged: false },
    executioner: { name: 'Executioner', hp: 100, attack: 40, range: 5, speed: 1.2, attackSpeed: 1000, icon: '🗡️', color: 0x4A4A4A, weapon: 'greatsword', armor: 'medium', isRanged: false },
    gladiator: { name: 'Gladiator', hp: 95, attack: 25, range: 6, speed: 1.3, attackSpeed: 900, icon: '🎭', color: 0xCC6600, weapon: 'trident', armor: 'medium', isRanged: false },
    champion: { name: 'Champion', hp: 130, attack: 30, range: 6, speed: 1.2, attackSpeed: 1000, icon: '🏅', color: 0xFFD700, weapon: 'sword_shield', armor: 'heavy', isRanged: false },
    assassin: { name: 'Assassin', hp: 60, attack: 45, range: 5, speed: 1.8, attackSpeed: 800, icon: '🗡️', color: 0x1a1a1a, weapon: 'daggers', armor: 'light', isRanged: false },
    ninja: { name: 'Ninja', hp: 70, attack: 35, range: 5, speed: 1.6, attackSpeed: 700, icon: '🥷', color: 0x1a1a1a, weapon: 'katana', armor: 'light', isRanged: false },
    horseman: { name: 'Horseman', hp: 90, attack: 20, range: 5, speed: 2.5, attackSpeed: 1200, icon: '🐴', color: 0x708090, weapon: 'lance', armor: 'medium', isRanged: false, isMounted: true },
    knight_rider: { name: 'Knight Rider', hp: 110, attack: 25, range: 6, speed: 2.2, attackSpeed: 1100, icon: '🐎', color: 0x4A4A4A, weapon: 'sword', armor: 'heavy', isRanged: false, isMounted: true },
    cavalry: { name: 'Cavalry', hp: 100, attack: 22, range: 5, speed: 2.3, attackSpeed: 1000, icon: '🏇', color: 0x708090, weapon: 'sword', armor: 'medium', isRanged: false, isMounted: true },
    lancer: { name: 'Lancer', hp: 85, attack: 30, range: 15, speed: 2.4, attackSpeed: 1300, icon: '🔫', color: 0xDAA520, weapon: 'lance', armor: 'light', isRanged: false, isMounted: true },
    chivalry: { name: 'Chivalry', hp: 130, attack: 20, range: 6, speed: 2.0, attackSpeed: 1200, icon: '🛡️', color: 0x4682B4, weapon: 'sword_shield', armor: 'heavy', isRanged: false, isMounted: true },
    sentinel: { name: 'Sentinel', hp: 150, attack: 8, range: 5, speed: 0.6, attackSpeed: 1800, icon: '🚪', color: 0x4682B4, weapon: 'shield', armor: 'heavy', isRanged: false },
    shield_bearer: { name: 'Shield Bearer', hp: 130, attack: 10, range: 5, speed: 0.8, attackSpeed: 1500, icon: '🛡️', color: 0x708090, weapon: 'shield', armor: 'medium', isRanged: false },
    wall: { name: 'Wall', hp: 300, attack: 0, range: 0, speed: 0, attackSpeed: 0, icon: '🧱', color: 0x555555, weapon: 'none', armor: 'none', isRanged: false, isBuilding: true },
    bunker: { name: 'Bunker', hp: 250, attack: 0, range: 0, speed: 0, attackSpeed: 0, icon: '🏰', color: 0x555555, weapon: 'none', armor: 'none', isRanged: false, isBuilding: true },
    scout: { name: 'Scout', hp: 40, attack: 10, range: 5, speed: 2.5, attackSpeed: 800, icon: '🏃', color: 0x556B2F, weapon: 'dagger', armor: 'light', isRanged: false },
    spy: { name: 'Spy', hp: 45, attack: 35, range: 5, speed: 2.0, attackSpeed: 600, icon: '🎭', color: 0x1a1a1a, weapon: 'poison_dagger', armor: 'light', isRanged: false },
    saboteur: { name: 'Saboteur', hp: 50, attack: 40, range: 5, speed: 1.8, attackSpeed: 800, icon: '💣', color: 0x8B4513, weapon: 'explosives', armor: 'light', isRanged: false },
    golem: { name: 'Golem', hp: 200, attack: 30, range: 6, speed: 0.5, attackSpeed: 2000, icon: '🗿', color: 0x696969, weapon: 'fist', armor: 'beast', isRanged: false },
    phoenix: { name: 'Phoenix', hp: 120, attack: 35, range: 20, speed: 2.0, attackSpeed: 1500, icon: '🔥', color: 0xFF4500, weapon: 'fire', armor: 'beast', isRanged: true },
    demon: { name: 'Demon', hp: 160, attack: 40, range: 8, speed: 1.2, attackSpeed: 1200, icon: '👹', color: 0x8B0000, weapon: 'claw', armor: 'beast', isRanged: false },
    angel: { name: 'Angel', hp: 140, attack: 25, range: 15, speed: 1.8, attackSpeed: 1500, icon: '👼', color: 0xFFD700, weapon: 'holy_light', armor: 'beast', isRanged: true },
    vampire: { name: 'Vampire', hp: 100, attack: 35, range: 5, speed: 1.4, attackSpeed: 900, icon: '🧛', color: 0x8B0000, weapon: 'fangs', armor: 'light', isRanged: false },
    werewolf: { name: 'Werewolf', hp: 110, attack: 30, range: 5, speed: 1.6, attackSpeed: 700, icon: '🐺', color: 0x4A3728, weapon: 'claw', armor: 'light', isRanged: false },
    ghost: { name: 'Ghost', hp: 60, attack: 25, range: 8, speed: 1.5, attackSpeed: 1000, icon: '👻', color: 0xCCCCCC, weapon: 'soul_drain', armor: 'none', isRanged: false },
    genie: { name: 'Genie', hp: 80, attack: 40, range: 60, speed: 1.3, attackSpeed: 1800, icon: '🧞', color: 0x4169E1, weapon: 'magic', armor: 'robes', isRanged: true },
    fairy: { name: 'Fairy', hp: 50, attack: 15, range: 30, speed: 2.0, attackSpeed: 800, icon: '🧚', color: 0xFF69B4, weapon: 'magic_dust', armor: 'light', isRanged: true },
    wizard: { name: 'Wizard', hp: 50, attack: 35, range: 60, speed: 0.8, attackSpeed: 2200, icon: '🧙', color: 0x4B0082, weapon: 'wizard_staff', armor: 'robes', isRanged: true },
    sorcerer: { name: 'Sorcerer', hp: 45, attack: 40, range: 55, speed: 0.7, attackSpeed: 2500, icon: '🧙‍♂️', color: 0x4B0082, weapon: 'dark_magic', armor: 'robes', isRanged: true },
    warlock: { name: 'Warlock', hp: 55, attack: 45, range: 50, speed: 0.7, attackSpeed: 2800, icon: '🧟', color: 0x2F1810, weapon: 'dark_ritual', armor: 'robes', isRanged: true },
    necromancer: { name: 'Necromancer', hp: 60, attack: 30, range: 45, speed: 0.6, attackSpeed: 3000, icon: '💀', color: 0x2F1810, weapon: 'necromancy', armor: 'robes', isRanged: true },
    elemental: { name: 'Elemental', hp: 90, attack: 35, range: 25, speed: 1.0, attackSpeed: 1500, icon: '🔥', color: 0xFF4500, weapon: 'elemental_fire', armor: 'beast', isRanged: true },
    druid: { name: 'Druid', hp: 70, attack: 20, range: 35, speed: 0.9, attackSpeed: 1800, icon: '🌿', color: 0x2E8B57, weapon: 'nature_magic', armor: 'robes', isRanged: true },
    priest: { name: 'Priest', hp: 65, attack: 8, range: 30, speed: 0.9, attackSpeed: 2200, icon: '✝️', color: 0xFFFFFF, weapon: 'holy_light', armor: 'robes', isRanged: true },
    cleric: { name: 'Cleric', hp: 70, attack: 10, range: 30, speed: 0.9, attackSpeed: 2000, icon: '☪️', color: 0xFFFFFF, weapon: 'holy_magic', armor: 'robes', isRanged: true },
    shaman: { name: 'Shaman', hp: 60, attack: 18, range: 35, speed: 1.0, attackSpeed: 1600, icon: '🪶', color: 0x8B4513, weapon: 'spirit_magic', armor: 'robes', isRanged: true },
};

// Low-poly armor colors
const ARMOR_COLORS = {
    light: 0x8B7355,    // Leather brown
    medium: 0x708090,    // Steel gray
    heavy: 0x4A4A4A,    // Dark iron
    robes: 0x6B5B95,    // Purple robes
    beast: 0x8B0000     // Red dragon scales
};

// Team cloth colors
const TEAM_CLOTH = {
    red: 0xCC3333,
    blue: 0x3366CC
};

const UNIT_PRICES = {
    knight: 50, archer: 50, warrior: 55, soldier: 45, pikeman: 55,
    crossbowman: 55, longbowman: 60, marksman: 65, slinger: 40, javelineer: 50,
    mage: 80, wizard: 100, sorcerer: 120, warlock: 130, necromancer: 140,
    elemental: 110, druid: 75, healer: 70, priest: 75, cleric: 75, shaman: 70,
    barbarian: 60, berserker: 75, executioner: 85, gladiator: 70, champion: 90,
    assassin: 80, ninja: 85, horseman: 65, knight_rider: 80, cavalry: 85,
    lancer: 75, chivalry: 95, guardian: 70, sentinel: 65, shield_bearer: 60,
    wall: 30, bunker: 50, scout: 35, spy: 55, saboteur: 60,
    golem: 200, phoenix: 250, dragon: 300, demon: 280, angel: 260,
    vampire: 150, werewolf: 140, ghost: 100, genie: 180, fairy: 90
};

const MAPS = {
    plain: { name: 'Plain', size: 200, color: 0x3d7a3d, groundColor: 0x2d5a3e },
    arena: { name: 'Arena', size: 140, color: 0x4a4a4a, groundColor: 0x3d3d3d },
    forest: { name: 'Forest', size: 200, color: 0x1a4a1a, groundColor: 0x1a4a1a },
    desert: { name: 'Desert', size: 200, color: 0xd4a560, groundColor: 0xd4a560 },
    snow: { name: 'Snow', size: 180, color: 0xe8f0f8, groundColor: 0xddeeff },
    volcano: { name: 'Volcano', size: 150, color: 0x4a1a1a, groundColor: 0x2a0a0a }
};

// ==================== GAME STATE ====================
let gameMode = null;
let currentMap = 'plain';
let maxUnitsPerTeam = 50;
let sandboxMoney = 1000;
let redMoney = 1000;
let blueMoney = 1000;
let campaignMoney = 500;

let scene, camera, renderer;
let units = [];
let projectiles = []; // Array to store active projectiles
let selectedUnit = 'knight';
let selectedTeam = 'red';
let isBattling = false;
let gameLoop = null;
let clock;
let groundPlane;

let cameraAngle = 0;
let cameraHeight = 80;
let cameraDistance = 80;

let startBtn, resetBtn, redCount, blueCount, battleStatus;
let winnerOverlay, winnerText, playAgainBtn, battlefieldContainer;

// ==================== INITIALIZATION ====================
function init() {
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    redCount = document.getElementById('redCount');
    blueCount = document.getElementById('blueCount');
    battleStatus = document.getElementById('battleStatus');
    winnerOverlay = document.getElementById('winnerOverlay');
    winnerText = document.getElementById('winnerText');
    playAgainBtn = document.getElementById('playAgainBtn');
    battlefieldContainer = document.getElementById('battlefieldContainer');
    
    setupMainMenu();
}

function setupMainMenu() {
    const mainMenu = document.getElementById('mainMenu');
    const levelSelect = document.getElementById('levelSelect');
    const sandboxSetup = document.getElementById('sandboxSetup');
    const sandboxBtn = document.getElementById('sandboxBtn');
    const normalBtn = document.getElementById('normalBtn');
    const gameContainer = document.querySelector('.game-container');
    const levelSlider = document.getElementById('levelSlider');
    const levelValue = document.getElementById('levelValue');
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    const startCampaignBtn = document.getElementById('startCampaignBtn');
    
    sandboxBtn.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        sandboxSetup.classList.remove('hidden');
    });
    
    // Sandbox setup button handlers
    document.getElementById('sandboxBackBtn').addEventListener('click', () => {
        sandboxSetup.classList.add('hidden');
        mainMenu.style.display = 'flex';
    });
    
    document.getElementById('sandboxStartBtn').addEventListener('click', () => {
        // Get settings
        const mapOption = document.querySelector('.map-option.selected');
        const selectedMap = mapOption ? mapOption.dataset.map : 'plain';
        
        // Get money slider value
        const moneySlider = document.getElementById('sandboxMoneySlider');
        const moneyValue = moneySlider ? parseInt(moneySlider.value) : 1000;
        
        // Check if no money limit is checked
        const noMoneyLimit = document.getElementById('noMoneyLimit');
        if (noMoneyLimit && noMoneyLimit.checked) {
            sandboxMoney = 999999999; // No limit
        } else {
            sandboxMoney = moneyValue;
        }
        
        // Get units slider value
        const unitsSlider = document.getElementById('maxUnitsSlider');
        const unitsValue = unitsSlider ? parseInt(unitsSlider.value) : 50;
        
        // Check if no units limit is checked
        const noUnitsLimit = document.getElementById('noUnitsLimit');
        if (noUnitsLimit && noUnitsLimit.checked) {
            maxUnitsPerTeam = 999999999; // No limit
        } else {
            maxUnitsPerTeam = unitsValue;
        }
        
        currentMap = selectedMap;
        
        // Debug - check values
        console.log("Starting sandbox with:", {
            map: currentMap,
            money: sandboxMoney,
            units: maxUnitsPerTeam
        });
        
        sandboxSetup.classList.add('hidden');
        gameContainer.style.display = 'flex';
        gameMode = 'sandbox';
        startSandbox();
    });
    
    // Update slider value displays
    const moneySlider = document.getElementById('sandboxMoneySlider');
    const moneyValueEl = document.getElementById('sandboxMoneyValue');
    if (moneySlider && moneyValueEl) {
        moneySlider.addEventListener('input', () => {
            updateMoneyDisplayWithLimit();
        });
    }
    
    const unitsSlider = document.getElementById('maxUnitsSlider');
    const unitsValueEl = document.getElementById('maxUnitsValue');
    if (unitsSlider && unitsValueEl) {
        unitsSlider.addEventListener('input', () => {
            updateUnitsDisplayWithLimit();
        });
    }
    
    // Listen to checkbox changes
    const noMoneyLimit = document.getElementById('noMoneyLimit');
    if (noMoneyLimit) {
        noMoneyLimit.addEventListener('change', updateMoneyDisplayWithLimit);
    }
    
    const noUnitsLimit = document.getElementById('noUnitsLimit');
    if (noUnitsLimit) {
        noUnitsLimit.addEventListener('change', updateUnitsDisplayWithLimit);
    }
    
    // Update functions
    function updateMoneyDisplayWithLimit() {
        const moneySlider = document.getElementById('sandboxMoneySlider');
        const noMoneyLimit = document.getElementById('noMoneyLimit');
        const moneyValueEl = document.getElementById('sandboxMoneyValue');
        
        if (noMoneyLimit && noMoneyLimit.checked) {
            moneyValueEl.innerHTML = '$∞ (No limit)';
            moneySlider.disabled = true;
        } else {
            moneyValueEl.innerHTML = '$' + moneySlider.value;
            moneySlider.disabled = false;
        }
    }
    
    function updateUnitsDisplayWithLimit() {
        const unitsSlider = document.getElementById('maxUnitsSlider');
        const noUnitsLimit = document.getElementById('noUnitsLimit');
        const unitsValueEl = document.getElementById('maxUnitsValue');
        
        if (noUnitsLimit && noUnitsLimit.checked) {
            unitsValueEl.innerHTML = '∞ (No limit)';
            unitsSlider.disabled = true;
        } else {
            unitsValueEl.innerHTML = unitsSlider.value + ' units';
            unitsSlider.disabled = false;
        }
    }
    
    // Map selection in sandbox setup
    document.querySelectorAll('.map-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.map-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });
    
    normalBtn.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        levelSelect.classList.remove('hidden');
    });
    
    // Level slider
    if (levelSlider && levelValue) {
        levelSlider.addEventListener('input', () => {
            levelValue.textContent = levelSlider.value;
        });
    }
    
    // Back button
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', () => {
            levelSelect.classList.add('hidden');
            mainMenu.style.display = 'flex';
        });
    }
    
    // Start campaign button
    if (startCampaignBtn) {
        startCampaignBtn.addEventListener('click', () => {
            currentLevel = parseInt(levelSlider.value);
            levelSelect.classList.add('hidden');
            gameContainer.style.display = 'flex';
            gameMode = 'campaign';
            startCampaign();
        });
    }
}

function startSandbox() {
    // Values are now set by the start button click handler before this is called
    // Don't reset them here!
    redMoney = sandboxMoney;
    blueMoney = sandboxMoney;
    
    initThreeJS();
    setupEventListeners();
    updateMoneyDisplay();
    animate();
}

function startCampaign() {
    currentLevel = 1;
    campaignMoney = 350;
    redMoney = campaignMoney;
    blueMoney = 0;
    currentMap = 'plain';
    
    initThreeJS();
    setupEventListeners();
    updateCampaignMoneyDisplay();
    
    // Spawn enemy units for Level 1 (only 2 weak enemies)
    for (let i = 0; i < 2; i++) {
        addUnit(40 + Math.random() * 30, -30 + Math.random() * 60, 'soldier', 'blue');
    }
    
    battleStatus.textContent = 'Level 1 - Place your units! (Enemies: 2)';
    animate();
}

function updateMoneyDisplay() {
    let moneyDiv = document.getElementById('moneyDisplay');
    if (!moneyDiv) {
        moneyDiv = document.createElement('div');
        moneyDiv.id = 'moneyDisplay';
        moneyDiv.className = 'money-display';
        moneyDiv.innerHTML = `
            <span class="team-money red">🔴 $<span id="redMoney">${redMoney}</span></span>
            <span class="team-money blue">🔵 $<span id="blueMoney">${blueMoney}</span></span>
        `;
        document.querySelector('.stats').insertBefore(moneyDiv, document.querySelector('.stat-row'));
    }
    document.getElementById('redMoney').textContent = redMoney;
    document.getElementById('blueMoney').textContent = blueMoney;
}

function updateCampaignMoneyDisplay() {
    let moneyDiv = document.getElementById('moneyDisplay');
    if (!moneyDiv) {
        moneyDiv = document.createElement('div');
        moneyDiv.id = 'moneyDisplay';
        moneyDiv.className = 'money-display';
        moneyDiv.innerHTML = `
            <span class="team-money red">🔴 Money: $<span id="redMoney">${redMoney}</span></span>
            <span class="team-money blue">🔵 Enemy</span>
        `;
        document.querySelector('.stats').insertBefore(moneyDiv, document.querySelector('.stat-row'));
    }
    document.getElementById('redMoney').textContent = redMoney;
    
    const headerMoney = document.getElementById('headerMoney');
    if (headerMoney) {
        document.getElementById('headerRedMoney').textContent = redMoney;
    }
}

function initThreeJS() {
    const container = battlefieldContainer;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const mapData = MAPS[currentMap];
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(mapData.color);
    
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    updateCameraPosition();
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);
    
    // Ground - use groundColor if available, otherwise fall back to color
    const groundGeo = new THREE.PlaneGeometry(mapData.size, mapData.size);
    const groundColor = mapData.groundColor || mapData.color;
    const groundMat = new THREE.MeshStandardMaterial({ color: groundColor });
    groundPlane = new THREE.Mesh(groundGeo, groundMat);
    groundPlane.rotation.x = -Math.PI / 2;
    scene.add(groundPlane);
    
    // Grid
    const grid = new THREE.GridHelper(mapData.size, 20, 0x1a3a2e, 0x1a3a2e);
    grid.position.y = 0.01;
    scene.add(grid);
    
    // Yellow line for campaign - ALWAYS show
    const lineGeo = new THREE.PlaneGeometry(2, mapData.size);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });
    const centerLine = new THREE.Mesh(lineGeo, lineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.y = 0.02;
    scene.add(centerLine);
    
    // === MAP-SPECIFIC FEATURES ===
    
    // FOREST - Add LOTS of trees and bushes
    if (currentMap === 'forest') {
        // Many trees
        for (let i = 0; i < 60; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.85;
            const z = (Math.random() - 0.5) * mapData.size * 0.85;
            if (Math.abs(x) < 25) continue;
            
            const tree = createTree();
            tree.position.set(x, 0, z);
            tree.scale.setScalar(1.0 + Math.random() * 0.8);
            scene.add(tree);
        }
        // Bushes
        for (let i = 0; i < 40; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.8;
            const z = (Math.random() - 0.5) * mapData.size * 0.8;
            if (Math.abs(x) < 20) continue;
            
            const bush = createBush();
            bush.position.set(x, 0, z);
            scene.add(bush);
        }
    }
    
    // DESERT - Add pyramids, cacti, and sand dunes
    if (currentMap === 'desert') {
        // Large pyramids
        for (let i = 0; i < 4; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.7;
            const z = (Math.random() - 0.5) * mapData.size * 0.7;
            if (Math.abs(x) < 30) continue;
            
            const pyramid = createPyramid();
            pyramid.position.set(x, 0, z);
            pyramid.scale.setScalar(1.2);
            scene.add(pyramid);
        }
        // Cacti
        for (let i = 0; i < 30; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.85;
            const z = (Math.random() - 0.5) * mapData.size * 0.85;
            if (Math.abs(x) < 20) continue;
            
            const cactus = createCactus();
            cactus.position.set(x, 0, z);
            scene.add(cactus);
        }
        // Sand dunes (bumps)
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.8;
            const z = (Math.random() - 0.5) * mapData.size * 0.8;
            if (Math.abs(x) < 25) continue;
            
            const dune = createSandDune();
            dune.position.set(x, 0, z);
            scene.add(dune);
        }
    }
    
    // SNOW - Add snowmen, ice rocks, AND SNOW MOUNTAINS (smaller, inside map)
    if (currentMap === 'snow') {
        // SNOW MOUNTAINS - smaller, placed inside the map edges
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
            const radius = mapData.size / 2 - 40; // Inside the map
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const mountain = createSnowMountain();
            mountain.position.set(x, 0, z);
            mountain.scale.setScalar(0.6 + Math.random() * 0.4); // Much smaller
            scene.add(mountain);
        }
        // Snowmen (smaller)
        for (let i = 0; i < 12; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.5;
            const z = (Math.random() - 0.5) * mapData.size * 0.5;
            if (Math.abs(x) < 15) continue;
            
            const snowman = createSnowman();
            snowman.position.set(x, 0, z);
            snowman.scale.setScalar(0.6); // Smaller
            scene.add(snowman);
        }
        // Ice rocks (smaller)
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.5;
            const z = (Math.random() - 0.5) * mapData.size * 0.5;
            if (Math.abs(x) < 15) continue;
            
            const rock = createIceRock();
            rock.position.set(x, 0, z);
            rock.scale.setScalar(0.5);
            scene.add(rock);
        }
    }
    
    // VOLCANO - Add lava rivers, rocks, AND VOLCANOES (smaller, inside map)
    if (currentMap === 'volcano') {
        // VOLCANOES - smaller, placed inside the map edges
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.2;
            const radius = mapData.size / 2 - 35; // Inside the map
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const volcano = createVolcano();
            volcano.position.set(x, 0, z);
            volcano.scale.setScalar(0.6 + Math.random() * 0.3); // Much smaller
            scene.add(volcano);
        }
        // Lava pools (smaller)
        for (let i = 0; i < 8; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.5;
            const z = (Math.random() - 0.5) * mapData.size * 0.5;
            if (Math.abs(x) < 25) continue;
            
            const lava = createLavaPool();
            lava.position.set(x, 0.05, z);
            lava.scale.setScalar(0.5);
            scene.add(lava);
        }
        // Volcanic rocks (smaller)
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * mapData.size * 0.6;
            const z = (Math.random() - 0.5) * mapData.size * 0.6;
            if (Math.abs(x) < 20) continue;
            
            const rock = createVolcanicRock();
            rock.position.set(x, 0, z);
            rock.scale.setScalar(0.3 + Math.random() * 0.4);
            scene.add(rock);
        }
    }
    
    // ARENA - Add stone pillars around the edge and center
    if (currentMap === 'arena') {
        // Outer pillars
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const radius = mapData.size / 2 - 10;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const pillar = createStonePillar();
            pillar.position.set(x, 0, z);
            pillar.lookAt(0, 0, 0);
            scene.add(pillar);
        }
        // Center monument
        const monument = createArenaMonument();
        monument.position.set(0, 0, 0);
        scene.add(monument);
    }
    
    clock = new THREE.Clock();
    window.addEventListener('resize', onWindowResize);
}

function updateCameraPosition() {
    camera.position.x = Math.sin(cameraAngle) * cameraDistance;
    camera.position.y = cameraHeight;
    camera.position.z = Math.cos(cameraAngle) * cameraDistance;
    camera.lookAt(0, 0, 0);
}

function onWindowResize() {
    const width = battlefieldContainer.clientWidth;
    const height = battlefieldContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function setupEventListeners() {
    // Unit buttons
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedUnit = btn.dataset.unit;
            updateUnitInfo(selectedUnit);
        });
    });
    
    document.querySelector('.unit-btn[data-unit="knight"]').classList.add('selected');
    updateUnitInfo('knight');
    
    // Team buttons
    document.querySelectorAll('.team-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (gameMode === 'campaign' && btn.dataset.team === 'blue') {
                battleStatus.textContent = 'Cannot place enemy units!';
                return;
            }
            document.querySelectorAll('.team-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTeam = btn.dataset.team;
        });
    });
    
    // Force Red team in campaign mode
    if (gameMode === 'campaign') {
        selectedTeam = 'red';
        document.querySelectorAll('.team-btn').forEach(b => {
            b.classList.remove('active');
            if (b.dataset.team === 'red') {
                b.classList.add('active');
            }
        });
    }
    
    // Click to place units
    renderer.domElement.addEventListener('click', function(e) {
        if (isBattling) return;
        placeUnitAtClick(e);
    });
    
    // Camera controls
    let isDragging = false;
    let lastX = 0, lastY = 0;
    
    renderer.domElement.addEventListener('mousedown', function(e) {
        if (e.button === 2) {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    renderer.domElement.addEventListener('mousemove', function(e) {
        if (isDragging && !isBattling) {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            cameraAngle += dx * 0.005;
            cameraHeight = Math.max(20, Math.min(150, cameraHeight - dy * 0.5));
            updateCameraPosition();
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    document.addEventListener('mouseup', () => { isDragging = false; });
    renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());
    
    renderer.domElement.addEventListener('wheel', function(e) {
        e.preventDefault();
        cameraDistance = Math.max(30, Math.min(200, cameraDistance + e.deltaY * 0.1));
        cameraHeight = cameraDistance;
        updateCameraPosition();
    }, { passive: false });
    
    // Arrow keys for camera control
    document.addEventListener('keydown', function(e) {
        if (isBattling) return;
        
        if (e.key === 'ArrowLeft') {
            cameraAngle -= 0.1;
            updateCameraPosition();
        } else if (e.key === 'ArrowRight') {
            cameraAngle += 0.1;
            updateCameraPosition();
        } else if (e.key === 'ArrowUp') {
            cameraDistance = Math.max(30, cameraDistance - 10);
            cameraHeight = cameraDistance;
            updateCameraPosition();
        } else if (e.key === 'ArrowDown') {
            cameraDistance = Math.min(200, cameraDistance + 10);
            cameraHeight = cameraDistance;
            updateCameraPosition();
        }
    });
    
    // Action buttons
    startBtn.addEventListener('click', startBattle);
    resetBtn.addEventListener('click', resetGame);
    playAgainBtn.addEventListener('click', resetGame);
    
    // Clear field button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearField);
    }
}

function updateUnitInfo(type) {
    const unitType = UNIT_TYPES[type];
    if (!unitType) return;
    document.getElementById('unitInfoIcon').textContent = unitType.icon;
    document.getElementById('unitInfoName').textContent = unitType.name;
    document.getElementById('unitInfoHP').textContent = unitType.hp;
    document.getElementById('unitInfoATK').textContent = unitType.attack;
    document.getElementById('unitInfoRNG').textContent = unitType.range;
    document.getElementById('unitInfoSPD').textContent = unitType.speed;
}

function placeUnitAtClick(e) {
    if (!groundPlane) return;
    
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
    
    const intersects = raycaster.intersectObject(groundPlane);
    
    if (intersects.length > 0) {
        const point = intersects[0].point;
        const boundary = MAPS[currentMap].size / 2 - 10;
        
        if (Math.abs(point.x) > boundary || Math.abs(point.z) > boundary) {
            battleStatus.textContent = 'Click inside the battlefield!';
            return;
        }
        
        // Red team can only place on left side (x < 0), Blue team can only place on right side (x > 0)
        if (selectedTeam === 'red' && point.x >= 0) {
            battleStatus.textContent = 'Red team: Place on LEFT side!';
            return;
        }
        if (selectedTeam === 'blue' && point.x <= 0) {
            battleStatus.textContent = 'Blue team: Place on RIGHT side!';
            return;
        }
        
        // Place the unit
        addUnit(point.x, point.z, selectedUnit, selectedTeam);
    } else {
        battleStatus.textContent = 'Click on the green ground!';
    }
}

// Create low-poly medieval warrior - UNIQUE DESIGNS FOR EACH TYPE
function createLowPolyWarrior(type, team) {
    const group = new THREE.Group();
    const unitType = UNIT_TYPES[type] || UNIT_TYPES.knight;
    const teamClothColor = team === 'red' ? TEAM_CLOTH.red : TEAM_CLOTH.blue;
    const weapon = unitType.weapon || 'sword';
    
    // Store references for animation
    const limbRefs = {
        leftArm: null,
        rightArm: null,
        leftLeg: null,
        rightLeg: null,
        head: null,
        weapon: weapon,
        weaponGroup: null,
        animTime: Math.random() * 100
    };
    
    // === KNIGHT - Heavy armor, tall, imposing ===
    if (type === 'knight' || type === 'guardian') {
        const armorColor = 0x4A4A4A;
        
        // Bulkier torso
        const torso = createBox(1.4, 2.0, 0.9, armorColor);
        torso.position.y = 2.6;
        group.add(torso);
        
        // Shoulder pads
        const shoulderL = createBox(0.6, 0.4, 0.5, 0x3A3A3A);
        shoulderL.position.set(-0.9, 3.2, 0);
        group.add(shoulderL);
        
        const shoulderR = createBox(0.6, 0.4, 0.5, 0x3A3A3A);
        shoulderR.position.set(0.9, 3.2, 0);
        group.add(shoulderR);
        
        // Tabard
        const tabard = createBox(1.1, 1.6, 0.75, teamClothColor);
        tabard.position.set(0, 2.4, 0.18);
        group.add(tabard);
        
        // Head - great helm style
        const head = createBox(1.0, 1.1, 1.0, 0x3A3A3A);
        head.position.y = 4.3;
        group.add(head);
        limbRefs.head = head;
        
        // Eye slit
        const eyeSlit = createBox(0.7, 0.15, 0.05, 0x000000);
        eyeSlit.position.set(0, 4.25, 0.52);
        group.add(eyeSlit);
        
        // Plume
        const plume = createBox(0.15, 0.7, 0.9, teamClothColor);
        plume.position.set(0, 5.0, 0);
        group.add(plume);
        
        // Arms - thicker
        limbRefs.leftArm = createLimb(-1.0, 3.1, 0, 0.4, 1.3, 0.4, armorColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(1.0, 3.1, 0, 0.4, 1.3, 0.4, armorColor);
        group.add(limbRefs.rightArm);
        
        // Sword + Large Kite Shield
        limbRefs.weaponGroup = createSword(1.4, 2.0, 0);
        group.add(limbRefs.weaponGroup);
        
        const shield = createBox(0.15, 1.6, 1.2, teamClothColor);
        shield.position.set(-1.0, 2.5, 0.4);
        group.add(shield);
        
        // Shield cross
        const crossV = createBox(0.08, 1.2, 0.16, 0xFFD700);
        crossV.position.set(-1.0, 2.6, 0.5);
        group.add(crossV);
        const crossH = createBox(0.6, 0.08, 0.16, 0xFFD700);
        crossH.position.set(-1.0, 2.8, 0.5);
        group.add(crossH);
        
        // Legs
        limbRefs.leftLeg = createLimb(-0.35, 1.2, 0, 0.45, 1.6, 0.45, armorColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.35, 1.2, 0, 0.45, 1.6, 0.45, armorColor);
        group.add(limbRefs.rightLeg);
        
        // Boots
        addBoots(armorColor, -0.35, 0.2);
        addBoots(armorColor, 0.35, 0.2);
    }
    
    // === SOLDIER - Medium armor, balanced ===
    else if (type === 'soldier' || type === 'warrior') {
        const armorColor = 0x708090;
        
        const torso = createBox(1.2, 1.8, 0.8, armorColor);
        torso.position.y = 2.5;
        group.add(torso);
        
        // Tabard
        const tabard = createBox(1.0, 1.4, 0.7, teamClothColor);
        tabard.position.set(0, 2.3, 0.15);
        group.add(tabard);
        
        // Head - nasal helmet
        const head = createBox(0.9, 1.0, 0.9, 0x5A5A5A);
        head.position.y = 4.2;
        group.add(head);
        limbRefs.head = head;
        
        // Nasal
        const nasal = createBox(0.1, 0.4, 0.3, 0x4A4A4A);
        nasal.position.set(0, 4.5, 0.55);
        group.add(nasal);
        
        // Arms
        limbRefs.leftArm = createLimb(-0.85, 2.9, 0, 0.35, 1.2, 0.35, armorColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.85, 2.9, 0, 0.35, 1.2, 0.35, armorColor);
        group.add(limbRefs.rightArm);
        
        // Sword + Round Shield
        limbRefs.weaponGroup = createSword(1.2, 1.8, 0);
        group.add(limbRefs.weaponGroup);
        
        const shield = createCylinder(-0.9, 2.6, 0.3, 0.7, 0.1, teamClothColor);
        group.add(shield);
        
        // Legs
        limbRefs.leftLeg = createLimb(-0.3, 1.2, 0, 0.4, 1.5, 0.4, armorColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.3, 1.2, 0, 0.4, 1.5, 0.4, armorColor);
        group.add(limbRefs.rightLeg);
        
        addBoots(0x2F1810, -0.3, 0.2);
        addBoots(0x2F1810, 0.3, 0.2);
    }
    
    // === ARCHER - Light armor, hood, bow ===
    else if (type === 'archer') {
        const armorColor = 0x8B7355; // Leather
        
        const torso = createBox(1.0, 1.6, 0.7, armorColor);
        torso.position.y = 2.4;
        group.add(torso);
        
        // Hood instead of helmet
        const hood = createBox(1.0, 0.8, 1.0, teamClothColor);
        hood.position.y = 4.3;
        group.add(hood);
        limbRefs.head = hood;
        
        // Face showing
        const face = createBox(0.7, 0.5, 0.3, 0xffdbac);
        face.position.set(0, 4.0, 0.45);
        group.add(face);
        
        // Arms - held up for bow
        limbRefs.leftArm = createLimb(-0.8, 3.2, 0.3, 0.3, 1.0, 0.3, armorColor);
        limbRefs.leftArm.rotation.z = 0.5;
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.8, 3.2, 0.3, 0.3, 1.0, 0.3, armorColor);
        limbRefs.rightArm.rotation.z = -0.5;
        group.add(limbRefs.rightArm);
        
        // Bow - curved
        limbRefs.weaponGroup = createBow();
        limbRefs.weaponGroup.position.set(1.2, 3.5, 0);
        group.add(limbRefs.weaponGroup);
        
        // Quiver on back
        const quiver = createCylinder(-0.4, 3.0, -0.3, 0.2, 0.8, 0x4A3520);
        group.add(quiver);
        
        // Legs - lighter
        limbRefs.leftLeg = createLimb(-0.25, 1.1, 0, 0.35, 1.4, 0.35, 0x5A4A3A);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.25, 1.1, 0, 0.35, 1.4, 0.35, 0x5A4A3A);
        group.add(limbRefs.rightLeg);
        
        addBoots(0x3A2A1A, -0.25, 0.15);
        addBoots(0x3A2A1A, 0.25, 0.15);
    }
    
    // === SPEARMAN - Medium armor, long reach ===
    else if (type === 'pikeman' || type === 'lancer') {
        const armorColor = 0x6A7A8A;
        
        const torso = createBox(1.1, 1.7, 0.75, armorColor);
        torso.position.y = 2.45;
        group.add(torso);
        
        // Tabard
        const tabard = createBox(0.9, 1.3, 0.65, teamClothColor);
        tabard.position.set(0, 2.25, 0.15);
        group.add(tabard);
        
        // Simple helmet
        const head = createBox(0.85, 0.9, 0.85, 0x5A6A7A);
        head.position.y = 4.15;
        group.add(head);
        limbRefs.head = head;
        
        // Arms
        limbRefs.leftArm = createLimb(-0.8, 2.85, 0, 0.32, 1.15, 0.32, armorColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.8, 2.85, 0, 0.32, 1.15, 0.32, armorColor);
        group.add(limbRefs.rightArm);
        
        // Spear - long!
        limbRefs.weaponGroup = createSpear();
        limbRefs.weaponGroup.position.set(1.0, 1.2, 0);
        group.add(limbRefs.weaponGroup);
        
        // Small shield
        const shield = createBox(0.1, 1.0, 0.7, teamClothColor);
        shield.position.set(-0.85, 2.4, 0.25);
        group.add(shield);
        
        // Legs
        limbRefs.leftLeg = createLimb(-0.28, 1.15, 0, 0.38, 1.45, 0.38, armorColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.28, 1.15, 0, 0.38, 1.45, 0.38, armorColor);
        group.add(limbRefs.rightLeg);
        
        addBoots(0x2F1810, -0.28, 0.18);
        addBoots(0x2F1810, 0.28, 0.18);
    }
    
    // === BARBARIAN - Wild, minimal armor, big axe ===
    else if (type === 'barbarian') {
        const armorColor = 0x6B4423; // Bare chest brown
        
        // Bare chest
        const torso = createBox(1.3, 1.9, 0.85, armorColor);
        torso.position.y = 2.5;
        group.add(torso);
        
        // Fur pelt
        const fur = createBox(1.1, 1.0, 0.6, 0x4A3520);
        fur.position.set(0, 2.0, 0.25);
        group.add(fur);
        
        // Wild hair/head
        const head = createBox(1.0, 1.2, 1.0, 0x3A2515);
        head.position.y = 4.3;
        group.add(head);
        limbRefs.head = head;
        
        // Beard
        const beard = createBox(0.6, 0.5, 0.4, 0x4A3520);
        beard.position.set(0, 3.7, 0.5);
        group.add(beard);
        
        // War paint
        const paint1 = createBox(0.3, 0.6, 0.05, 0xFF0000);
        paint1.position.set(-0.25, 4.3, 0.52);
        group.add(paint1);
        const paint2 = createBox(0.3, 0.6, 0.05, 0xFF0000);
        paint2.position.set(0.25, 4.3, 0.52);
        group.add(paint2);
        
        // Arms - muscular
        limbRefs.leftArm = createLimb(-0.95, 3.0, 0, 0.4, 1.3, 0.4, 0x6B4423);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.95, 3.0, 0, 0.4, 1.3, 0.4, 0x6B4423);
        group.add(limbRefs.rightArm);
        
        // BIG AXE
        limbRefs.weaponGroup = createAxe();
        limbRefs.weaponGroup.position.set(1.2, 1.8, 0);
        group.add(limbRefs.weaponGroup);
        
        // Loincloth
        const cloth = createBox(1.0, 0.8, 0.7, teamClothColor);
        cloth.position.set(0, 1.3, 0.1);
        group.add(cloth);
        
        // Legs - bare
        limbRefs.leftLeg = createLimb(-0.3, 1.0, 0, 0.38, 1.3, 0.38, 0x5A3A25);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.3, 1.0, 0, 0.38, 1.3, 0.38, 0x5A3A25);
        group.add(limbRefs.rightLeg);
    }
    
    // === VAMPIRE - Pale, dark cloak, fangs ===
    else if (type === 'vampire') {
        const robeColor = 0x1a0a0a; // Dark red-black
        
        // Dark cloak
        const cloak = createBox(1.5, 3.2, 1.2, 0x0a0a0a);
        cloak.position.y = 2.0;
        group.add(cloth);
        
        // Red vest
        const vest = createBox(1.2, 2.0, 0.8, 0x8B0000);
        vest.position.set(0, 2.2, 0.1);
        group.add(vest);
        
        // Pale head
        const head = createBox(0.9, 1.0, 0.9, 0xFFE4E1);
        head.position.y = 4.2;
        group.add(head);
        limbRefs.head = head;
        
        // Red eyes
        const eyeL = createBox(0.15, 0.1, 0.05, 0xFF0000);
        eyeL.position.set(-0.2, 4.3, 0.48);
        group.add(eyeL);
        const eyeR = createBox(0.15, 0.1, 0.05, 0xFF0000);
        eyeR.position.set(0.2, 4.3, 0.48);
        group.add(eyeR);
        
        // Fangs
        const fangL = createBox(0.08, 0.15, 0.05, 0xFFFFFF);
        fangL.position.set(-0.15, 3.9, 0.48);
        group.add(fangL);
        const fangR = createBox(0.08, 0.15, 0.05, 0xFFFFFF);
        fangR.position.set(0.15, 3.9, 0.48);
        group.add(fangR);
        
        // Arms
        limbRefs.leftArm = createLimb(-0.9, 2.8, 0, 0.35, 1.3, 0.35, 0x1a0a0a);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.9, 2.8, 0, 0.35, 1.3, 0.35, 0x1a0a0a);
        group.add(limbRefs.rightArm);
        
        // Cape behind
        const cape = createBox(1.4, 2.5, 0.2, 0x050505);
        cape.position.set(0, 2.0, -0.6);
        group.add(cape);
        
        // Legs
        limbRefs.leftLeg = createLimb(-0.3, 1.0, 0, 0.38, 1.3, 0.38, 0x1a0a0a);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.3, 1.0, 0, 0.38, 1.3, 0.38, 0x1a0a0a);
        group.add(limbRefs.rightLeg);
    }
    
    // === WEREWOLF - Beast form, fur, claws ===
    else if (type === 'werewolf') {
        const furColor = 0x4A3728;
        
        // Beast body
        const body = createBox(1.4, 2.0, 1.0, furColor);
        body.position.y = 2.3;
        group.add(body);
        
        // Wolf head
        const head = createBox(1.1, 1.3, 1.2, furColor);
        head.position.y = 4.3;
        group.add(head);
        limbRefs.head = head;
        
        // Snout
        const snout = createBox(0.6, 0.5, 0.5, 0x3A2718);
        snout.position.set(0, 4.0, 0.7);
        group.add(snout);
        
        // Nose
        const nose = createBox(0.2, 0.15, 0.15, 0x000000);
        nose.position.set(0, 4.0, 0.95);
        group.add(nose);
        
        // Yellow eyes
        const eyeL = createBox(0.15, 0.12, 0.05, 0xFFD700);
        eyeL.position.set(-0.3, 4.4, 0.6);
        group.add(eyeL);
        const eyeR = createBox(0.15, 0.12, 0.05, 0xFFD700);
        eyeR.position.set(0.3, 4.4, 0.6);
        group.add(eyeR);
        
        // Pointed ears
        const earL = createBox(0.2, 0.4, 0.1, furColor);
        earL.position.set(-0.4, 5.0, 0);
        earL.rotation.z = -0.3;
        group.add(earL);
        const earR = createBox(0.2, 0.4, 0.1, furColor);
        earR.position.set(0.4, 5.0, 0);
        earR.rotation.z = 0.3;
        group.add(earR);
        
        // Clawed arms
        limbRefs.leftArm = createLimb(-0.95, 2.7, 0, 0.4, 1.2, 0.4, furColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.95, 2.7, 0, 0.4, 1.2, 0.4, furColor);
        group.add(limbRefs.rightArm);
        
        // Beast legs
        limbRefs.leftLeg = createLimb(-0.35, 1.0, 0, 0.45, 1.4, 0.45, furColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.35, 1.0, 0, 0.45, 1.4, 0.45, furColor);
        group.add(limbRefs.rightLeg);
        
        // Tail
        const tail = createBox(0.2, 1.5, 0.2, furColor);
        tail.position.set(0, 1.5, -0.8);
        tail.rotation.x = 0.5;
        group.add(tail);
    }
    
    // === DRAGON - Huge beast, wings, scales ===
    else if (type === 'dragon') {
        const scaleColor = 0x8B0000;
        
        // Large beast body
        const body = createBox(2.0, 2.5, 1.5, scaleColor);
        body.position.y = 2.5;
        group.add(body);
        
        // Dragon head
        const head = createBox(1.5, 1.5, 2.0, scaleColor);
        head.position.y = 4.5;
        group.add(head);
        limbRefs.head = head;
        
        // Snout
        const snout = createBox(0.8, 0.6, 1.2, 0x6B0000);
        snout.position.set(0, 4.3, 1.3);
        group.add(snout);
        
        // Nostrils with smoke
        const nostrilL = createBox(0.15, 0.1, 0.1, 0x222222);
        nostrilL.position.set(-0.2, 4.3, 1.9);
        group.add(nostrilL);
        const nostrilR = createBox(0.15, 0.1, 0.1, 0x222222);
        nostrilR.position.set(0.2, 4.3, 1.9);
        group.add(nostrilR);
        
        // Glowing eyes
        const eyeL = createBox(0.2, 0.15, 0.1, 0xFFD700);
        eyeL.position.set(-0.4, 4.9, 0.9);
        group.add(eyeL);
        const eyeR = createBox(0.2, 0.15, 0.1, 0xFFD700);
        eyeR.position.set(0.4, 4.9, 0.9);
        group.add(eyeR);
        
        // Horns
        const hornL = createBox(0.15, 0.8, 0.15, 0x2F1810);
        hornL.position.set(-0.6, 5.3, 0);
        hornL.rotation.z = -0.4;
        group.add(hornL);
        const hornR = createBox(0.15, 0.8, 0.15, 0x2F1810);
        hornR.position.set(0.6, 5.3, 0);
        hornR.rotation.z = 0.4;
        group.add(hornR);
        
        // Wings (folded)
        const wingL = createBox(0.1, 2.0, 1.5, 0x5A0000);
        wingL.position.set(-1.2, 3.5, 0);
        wingL.rotation.z = 0.2;
        group.add(wingL);
        const wingR = createBox(0.1, 2.0, 1.5, 0x5A0000);
        wingR.position.set(1.2, 3.5, 0);
        wingR.rotation.z = -0.2;
        group.add(wingR);
        
        // Tail
        const tail = createBox(0.4, 2.5, 0.4, scaleColor);
        tail.position.set(0, 1.5, -1.5);
        tail.rotation.x = 0.4;
        group.add(tail);
        
        // Legs
        limbRefs.leftLeg = createLimb(-0.5, 1.2, 0, 0.5, 1.5, 0.5, scaleColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.5, 1.2, 0, 0.5, 1.5, 0.5, scaleColor);
        group.add(limbRefs.rightLeg);
    }
    
    // === Golem - Stone creature, bulky ===
    else if (type === 'golem') {
        const stoneColor = 0x696969;
        
        // Rocky body
        const body = createBox(1.6, 2.2, 1.2, stoneColor);
        body.position.y = 2.6;
        group.add(body);
        
        // Stone head
        const head = createBox(1.2, 1.2, 1.1, 0x505050);
        head.position.y = 4.5;
        group.add(head);
        limbRefs.head = head;
        
        // Glowing eyes
        const eyeL = createBox(0.2, 0.15, 0.1, 0xFF4500);
        eyeL.position.set(-0.35, 4.6, 0.55);
        group.add(eyeL);
        const eyeR = createBox(0.2, 0.15, 0.1, 0xFF4500);
        eyeR.position.set(0.35, 4.6, 0.55);
        group.add(eyeR);
        
        // Cracks/details
        const crack1 = createBox(0.6, 0.08, 0.05, 0x404040);
        crack1.position.set(0, 3.0, 0.65);
        group.add(crack1);
        
        // Stone arms
        limbRefs.leftArm = createLimb(-1.1, 3.0, 0, 0.5, 1.4, 0.5, stoneColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(1.1, 3.0, 0, 0.5, 1.4, 0.5, stoneColor);
        group.add(limbRefs.rightArm);
        
        // Stone legs
        limbRefs.leftLeg = createLimb(-0.4, 1.2, 0, 0.5, 1.6, 0.5, stoneColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.4, 1.2, 0, 0.5, 1.6, 0.5, stoneColor);
        group.add(limbRefs.rightLeg);
    }
    
    // === MAGE/HEALER - Robes, magical ===
    else if (type === 'mage' || type === 'healer' || type === 'wizard') {
        const robeColor = type === 'healer' ? 0x2E8B57 : 0x4B0082;
        
        // Robe - flowing
        const robe = createBox(1.4, 3.0, 1.0, robeColor);
        robe.position.y = 2.0;
        group.add(robe);
        
        // Belt
        const belt = createBox(1.2, 0.2, 0.9, 0x8B4513);
        belt.position.set(0, 2.5, 0.1);
        group.add(belt);
        
        // Hood up
        const hood = createBox(1.1, 0.9, 1.1, robeColor);
        hood.position.y = 4.2;
        group.add(hood);
        limbRefs.head = hood;
        
        // Face glow
        const face = createBox(0.5, 0.4, 0.1, type === 'healer' ? 0x90EE90 : 0x9370DB);
        face.position.set(0, 4.1, 0.55);
        group.add(face);
        
        // Arms - hidden in sleeves
        limbRefs.leftArm = createLimb(-0.85, 2.8, 0, 0.4, 1.4, 0.4, robeColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.85, 2.8, 0, 0.4, 1.4, 0.4, robeColor);
        group.add(limbRefs.rightArm);
        
        // Magic Staff
        limbRefs.weaponGroup = createStaff(type === 'healer' ? 0x00FF00 : 0x9400D3);
        limbRefs.weaponGroup.position.set(1.0, 1.0, 0);
        group.add(limbRefs.weaponGroup);
        
        // Robe bottom
        const robeBottom = createBox(1.2, 1.2, 0.9, robeColor);
        robeBottom.position.set(0, 0.6, 0.05);
        group.add(robeBottom);
    }
    
    // === DEFAULT - Basic soldier ===
    else {
        const armorColor = 0x708090;
        
        const torso = createBox(1.2, 1.8, 0.8, armorColor);
        torso.position.y = 2.5;
        group.add(torso);
        
        const tabard = createBox(1.0, 1.4, 0.7, teamClothColor);
        tabard.position.set(0, 2.3, 0.15);
        group.add(tabard);
        
        const head = createBox(0.9, 1.0, 0.9, 0x5A5A5A);
        head.position.y = 4.2;
        group.add(head);
        limbRefs.head = head;
        
        limbRefs.leftArm = createLimb(-0.85, 2.9, 0, 0.35, 1.2, 0.35, armorColor);
        group.add(limbRefs.leftArm);
        
        limbRefs.rightArm = createLimb(0.85, 2.9, 0, 0.35, 1.2, 0.35, armorColor);
        group.add(limbRefs.rightArm);
        
        limbRefs.weaponGroup = createSword(1.2, 1.8, 0);
        group.add(limbRefs.weaponGroup);
        
        limbRefs.leftLeg = createLimb(-0.3, 1.2, 0, 0.4, 1.5, 0.4, armorColor);
        group.add(limbRefs.leftLeg);
        
        limbRefs.rightLeg = createLimb(0.3, 1.2, 0, 0.4, 1.5, 0.4, armorColor);
        group.add(limbRefs.rightLeg);
        
        addBoots(0x2F1810, -0.3, 0.2);
        addBoots(0x2F1810, 0.3, 0.2);
    }
    
    // === SHADOW UNDER UNIT ===
    const shadow = createShadow(2.0);
    shadow.position.y = 0.05;
    group.add(shadow);
    
    // Store refs
    group.userData = limbRefs;
    
    return group;
}

// Helper functions for creating 3D parts
function createBox(w, h, d, color) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: color, flatShading: true, roughness: 0.7, metalness: 0.1 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
}

function createLimb(x, y, z, w, h, d, color) {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: color, flatShading: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = -h/2;
    mesh.castShadow = true;
    group.add(mesh);
    group.position.set(x, y, z);
    return group;
}

function addBoots(color, x, y) {
    const boot = createBox(0.45, 0.35, 0.5, color);
    boot.position.set(x, y, 0.1);
    return boot;
}

function createShadow(size) {
    const geo = new THREE.PlaneGeometry(size, size);
    const mat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
}

function createCylinder(x, y, z, radius, height, color) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 12);
    const mat = new THREE.MeshStandardMaterial({ color: color, flatShading: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
}

function createSword(x, y, z) {
    const group = new THREE.Group();
    
    // Blade
    const blade = createBox(0.1, 2.2, 0.1, 0xC0C0C0);
    blade.position.y = 1.1;
    group.add(blade);
    
    // Crossguard
    const guard = createBox(0.5, 0.15, 0.15, 0xFFD700);
    guard.position.y = -0.1;
    group.add(guard);
    
    // Handle
    const handle = createBox(0.12, 0.4, 0.12, 0x8B4513);
    handle.position.y = -0.4;
    group.add(handle);
    
    group.position.set(x, y, z);
    group.rotation.z = -0.3;
    return group;
}

function createSpear() {
    const group = new THREE.Group();
    
    // Shaft
    const shaft = createCylinder(0, 0, 0, 0.06, 4.5, 0x8B4513);
    shaft.position.y = 2.25;
    group.add(shaft);
    
    // Tip
    const tip = new THREE.ConeGeometry(0.18, 0.6, 4);
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.8, flatShading: true });
    const tipMesh = new THREE.Mesh(tip, tipMat);
    tipMesh.position.y = 4.55;
    tipMesh.rotation.x = Math.PI;
    group.add(tipMesh);
    
    return group;
}

function createBow() {
    const group = new THREE.Group();
    
    // Curved bow
    const bowGeo = new THREE.TorusGeometry(0.9, 0.06, 4, 8, Math.PI);
    const bowMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, flatShading: true });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.rotation.z = Math.PI / 2;
    group.add(bow);
    
    // String
    const stringGeo = new THREE.BoxGeometry(0.03, 1.8, 0.03);
    const stringMat = new THREE.MeshStandardMaterial({ color: 0xDDDDDD });
    const string = new THREE.Mesh(stringGeo, stringMat);
    string.position.y = -0.9;
    group.add(string);
    
    return group;
}

function createAxe() {
    const group = new THREE.Group();
    
    // Handle
    const handle = createCylinder(0, 0, 0, 0.08, 2.8, 0x8B4513);
    handle.position.y = 1.4;
    group.add(handle);
    
    // Double-headed axe blade
    const bladeGeo = new THREE.BoxGeometry(1.0, 0.5, 0.12);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x5A5A5A, metalness: 0.7, flatShading: true });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 2.8;
    group.add(blade);
    
    return group;
}

function createStaff(orbColor) {
    const group = new THREE.Group();
    
    // Staff pole
    const pole = createCylinder(0, 0, 0, 0.08, 3.8, 0x8B4513);
    pole.position.y = 1.9;
    group.add(pole);
    
    // Orb
    const orbGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const orbMat = new THREE.MeshStandardMaterial({ 
        color: orbColor, 
        emissive: orbColor, 
        emissiveIntensity: 0.6, 
        flatShading: true 
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 3.8;
    group.add(orb);
    
    return group;
}

// === MAP FEATURE FUNCTIONS ===

// Tree for Forest map
function createTree() {
    const group = new THREE.Group();
    
    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4A3520, flatShading: true });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    group.add(trunk);
    
    // Foliage (low-poly cone)
    const foliageGeo = new THREE.ConeGeometry(2.5, 5, 6);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1A5A1A, flatShading: true });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.y = 5;
    group.add(foliage);
    
    return group;
}

// Pyramid for Desert map
function createPyramid() {
    const group = new THREE.Group();
    
    const geo = new THREE.ConeGeometry(6, 8, 4);
    const mat = new THREE.MeshStandardMaterial({ color: 0xD4A574, flatShading: true });
    const pyramid = new THREE.Mesh(geo, mat);
    pyramid.position.y = 4;
    pyramid.rotation.y = Math.PI / 4;
    group.add(pyramid);
    
    return group;
}

// Cactus for Desert map
function createCactus() {
    const group = new THREE.Group();
    
    // Main body
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.35, 2.5, 6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2D5A2D, flatShading: true });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.25;
    group.add(body);
    
    // Arms
    const armGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 6);
    const arm1 = new THREE.Mesh(armGeo, bodyMat);
    arm1.position.set(0.4, 1.2, 0);
    arm1.rotation.z = -0.5;
    group.add(arm1);
    
    const arm2 = new THREE.Mesh(armGeo, bodyMat);
    arm2.position.set(-0.3, 1.8, 0);
    arm2.rotation.z = 0.4;
    group.add(arm2);
    
    return group;
}

// Snowman for Snow map
function createSnowman() {
    const group = new THREE.Group();
    
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xFAFAFA, flatShading: true });
    
    // Bottom ball
    const bottom = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 6), snowMat);
    bottom.position.y = 1.2;
    group.add(bottom);
    
    // Middle ball
    const middle = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), snowMat);
    middle.position.y = 2.8;
    group.add(middle);
    
    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), snowMat);
    head.position.y = 4.0;
    group.add(head);
    
    // Nose (carrot)
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0xFF6600, flatShading: true }));
    nose.position.set(0, 4.0, 0.6);
    nose.rotation.x = Math.PI / 2;
    group.add(nose);
    
    return group;
}

// Ice rock for Snow map
function createIceRock() {
    const geo = new THREE.DodecahedronGeometry(1.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xADD8E6, flatShading: true, transparent: true, opacity: 0.8 });
    const rock = new THREE.Mesh(geo, mat);
    rock.position.y = 0.8;
    rock.scale.y = 0.6;
    return rock;
}

// Lava pool for Volcano map
function createLavaPool() {
    const group = new THREE.Group();
    
    const geo = new THREE.CircleGeometry(3, 8);
    const mat = new THREE.MeshBasicMaterial({ color: 0xFF4500, transparent: true, opacity: 0.8 });
    const lava = new THREE.Mesh(geo, mat);
    lava.rotation.x = -Math.PI / 2;
    group.add(lava);
    
    // Glowing center
    const centerGeo = new THREE.CircleGeometry(1.5, 8);
    const centerMat = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.rotation.x = -Math.PI / 2;
    center.position.y = 0.01;
    group.add(center);
    
    return group;
}

// Volcanic rock for Volcano map
function createVolcanicRock() {
    const geo = new THREE.DodecahedronGeometry(1.2, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x2F1810, flatShading: true });
    const rock = new THREE.Mesh(geo, mat);
    rock.position.y = 0.6;
    rock.scale.y = 0.7;
    return rock;
}

// Stone pillar for Arena map
function createStonePillar() {
    const group = new THREE.Group();
    
    // Base
    const baseGeo = new THREE.CylinderGeometry(1.5, 1.8, 2, 8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x696969, flatShading: true });
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 1;
    group.add(base);
    
    // Column
    const colGeo = new THREE.CylinderGeometry(1, 1.2, 6, 8);
    const column = new THREE.Mesh(colGeo, stoneMat);
    column.position.y = 5;
    group.add(column);
    
    // Top
    const topGeo = new THREE.CylinderGeometry(1.3, 1, 1.5, 8);
    const top = new THREE.Mesh(topGeo, stoneMat);
    top.position.y = 8.75;
    group.add(top);
    
    return group;
}

// Bush for Forest map
function createBush() {
    const group = new THREE.Group();
    
    // Main bush
    const bushGeo = new THREE.SphereGeometry(1.0, 6, 5);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x2D5A2D, flatShading: true });
    const bush = new THREE.Mesh(bushGeo, bushMat);
    bush.position.y = 0.8;
    bush.scale.set(1, 0.7, 1);
    group.add(bush);
    
    // Smaller detail
    const detailGeo = new THREE.SphereGeometry(0.6, 5, 4);
    const detail = new THREE.Mesh(detailGeo, bushMat);
    detail.position.set(0.4, 1.0, 0.3);
    group.add(detail);
    
    return group;
}

// Sand dune for Desert map
function createSandDune() {
    const geo = new THREE.SphereGeometry(2.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0xD4B896, flatShading: true });
    const dune = new THREE.Mesh(geo, mat);
    dune.position.y = 0;
    dune.scale.y = 0.3;
    return dune;
}

// Snow Mountain for Snow map
function createSnowMountain() {
    const group = new THREE.Group();
    
    // Mountain peak
    const geo = new THREE.ConeGeometry(8, 18, 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0xFAFAFA, flatShading: true });
    const mountain = new THREE.Mesh(geo, mat);
    mountain.position.y = 9;
    group.add(mountain);
    
    // Snow cap (white top)
    const capGeo = new THREE.ConeGeometry(3, 6, 6);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, flatShading: true });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 14;
    group.add(cap);
    
    return group;
}

// Volcano for Volcano map
function createVolcano() {
    const group = new THREE.Group();
    
    // Volcano base
    const baseGeo = new THREE.ConeGeometry(10, 15, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x3D1C0C, flatShading: true });
    const volcano = new THREE.Mesh(baseGeo, baseMat);
    volcano.position.y = 7.5;
    group.add(volcano);
    
    // Lava crater at top
    const craterGeo = new THREE.CylinderGeometry(3, 2, 2, 8);
    const craterMat = new THREE.MeshBasicMaterial({ color: 0xFF4500 });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.y = 14;
    group.add(crater);
    
    // Glowing center
    const glowGeo = new THREE.CircleGeometry(2, 8);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 14.5;
    group.add(glow);
    
    return group;
}

// Arena monument (center)
function createArenaMonument() {
    const group = new THREE.Group();
    
    // Base platform
    const baseGeo = new THREE.CylinderGeometry(5, 6, 2, 8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x555555, flatShading: true });
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 1;
    group.add(base);
    
    // Statue pedestal
    const pedGeo = new THREE.BoxGeometry(3, 4, 3);
    const ped = new THREE.Mesh(pedGeo, stoneMat);
    ped.position.y = 4;
    group.add(ped);
    
    // Statue figure (simplified)
    const figGeo = new THREE.ConeGeometry(2, 8, 4);
    const figMat = new THREE.MeshStandardMaterial({ color: 0x888888, flatShading: true });
    const figure = new THREE.Mesh(figGeo, figMat);
    figure.position.y = 10;
    group.add(figure);
    
    return group;
}

function addUnit(x, z, type, team) {
    const price = UNIT_PRICES[type] || 50;
    const teamMoney = team === 'red' ? redMoney : blueMoney;
    const teamUnits = units.filter(u => u.team === team && !u.dying);
    
    // Check money - skip for enemy in campaign
    if (!(team === 'blue' && gameMode === 'campaign')) {
        if (teamMoney < price) {
            battleStatus.textContent = `Need $${price} for this unit!`;
            return;
        }
    }
    
    if (teamUnits.length >= maxUnitsPerTeam) {
        battleStatus.textContent = `Max ${maxUnitsPerTeam} units!`;
        return;
    }
    
    // Deduct money
    if (!(team === 'blue' && gameMode === 'campaign')) {
        if (team === 'red') redMoney -= price;
        else if (gameMode === 'sandbox') blueMoney -= price;
        
        if (gameMode === 'sandbox') updateMoneyDisplay();
        else updateCampaignMoneyDisplay();
    }
    
    // Create low-poly warrior
    const group = createLowPolyWarrior(type, team);
    
    // Health bar
    const healthGroup = new THREE.Group();
    const bgGeo = new THREE.PlaneGeometry(3, 0.4);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    healthGroup.add(bg);
    
    const healthGeo = new THREE.PlaneGeometry(2.8, 0.3);
    const healthMat = new THREE.MeshBasicMaterial({ color: 0x27ae60 });
    const health = new THREE.Mesh(healthGeo, healthMat);
    health.position.z = 0.01;
    healthGroup.add(health);
    healthGroup.position.y = 6.5;
    healthGroup.userData = { health: health, healthMat: healthMat };
    group.add(healthGroup);
    
    group.position.set(x, 0, z);
    group.rotation.y = team === 'red' ? 0 : Math.PI;
    scene.add(group);
    
    // Add to units array
    const unitType = UNIT_TYPES[type];
    const unit = {
        id: Date.now() + Math.random(),
        mesh: group,
        type: type,
        team: team,
        x: x,
        z: z,
        hp: unitType.hp,
        maxHp: unitType.hp,
        attack: unitType.attack,
        range: unitType.range,
        speed: unitType.speed,
        attackSpeed: unitType.attackSpeed,
        lastAttack: 0,
        target: null,
        moving: false,
        dying: false,
        dyingTime: 0,
        healthGroup: healthGroup,
        animState: 'idle',
        animTimer: 0
    };
    
    units.push(unit);
    updateStats();
    
    battleStatus.textContent = `Placed ${unitType.name}!`;
}

function updateStats() {
    const redUnits = units.filter(u => u.team === 'red' && !u.dying);
    const blueUnits = units.filter(u => u.team === 'blue' && !u.dying);
    redCount.textContent = redUnits.length;
    blueCount.textContent = blueUnits.length;
}

function startBattle() {
    const redUnits = units.filter(u => u.team === 'red' && !u.dying);
    const blueUnits = units.filter(u => u.team === 'blue' && !u.dying);
    
    if (redUnits.length === 0 || blueUnits.length === 0) {
        battleStatus.textContent = 'Need units on both sides!';
        return;
    }
    
    isBattling = true;
    startBtn.disabled = true;
    battleStatus.textContent = '⚔️ Battle! ⚔️';
    
    gameLoop = setInterval(updateBattle, 16);
}

function updateBattle() {
    const aliveUnits = units.filter(u => !u.dying);
    
    aliveUnits.forEach(unit => {
        unit.target = findTarget(unit);
        
        if (unit.target) {
            const dist = getDistance(unit, unit.target);
            
            if (dist <= unit.range) {
                attackUnit(unit, unit.target);
            } else {
                moveToward(unit, unit.target);
            }
        }
    });
    
    // Remove dead units
    units.filter(u => u.dying).forEach(unit => {
        unit.dyingTime += 0.016;
        if (unit.dyingTime > 1) {
            scene.remove(unit.mesh);
        }
    });
    
    units = units.filter(u => !u.dying || u.dyingTime <= 1);
    checkWinCondition();
}

function findTarget(unit) {
    const enemies = units.filter(u => u.team !== unit.team && !u.dying);
    if (enemies.length === 0) return null;
    
    return enemies.reduce((nearest, enemy) => {
        const dist = getDistance(unit, enemy);
        const nearestDist = getDistance(unit, nearest);
        return dist < nearestDist ? enemy : nearest;
    });
}

function getDistance(u1, u2) {
    return Math.sqrt(Math.pow(u2.x - u1.x, 2) + Math.pow(u2.z - u1.z, 2));
}

function moveToward(unit, target) {
    const dx = target.x - unit.x;
    const dz = target.z - unit.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    
    if (dist > 2) {
        unit.x += (dx / dist) * unit.speed * 0.1;
        unit.z += (dz / dist) * unit.speed * 0.1;
        unit.moving = true;
    } else {
        unit.moving = false;
    }
    
    const boundary = MAPS[currentMap].size / 2 - 5;
    unit.x = Math.max(-boundary, Math.min(boundary, unit.x));
    unit.z = Math.max(-boundary, Math.min(boundary, unit.z));
    
    unit.mesh.lookAt(target.x, 0, target.z);
    unit.mesh.position.x = unit.x;
    unit.mesh.position.z = unit.z;
}

// Attack animation with weapon-specific animations
function attackUnit(attacker, target) {
    // Slow down attacks - multiply attackSpeed by 2 for slower combat
    if (Date.now() - attacker.lastAttack < attacker.attackSpeed * 2) return;
    if (attacker.isAttacking) return; // Already attacking
    
    attacker.lastAttack = Date.now();
    attacker.isAttacking = true;
    attacker.attackPhase = 0;
    attacker.attackTarget = target;
    
    // Get weapon type
    const weapon = UNIT_TYPES[attacker.type]?.weapon || 'sword';
    
    // Start attack animation based on weapon type
    if (weapon === 'bow' || weapon === 'crossbow' || weapon === 'longbow') {
        // Ranged attack - spawn arrow
        attacker.attackDuration = 0.8; // Time for full animation
        performBowAttack(attacker, target);
    } else if (weapon === 'staff' || weapon === 'wizard_staff' || weapon === 'magic' || weapon === 'healer_staff' || weapon === 'dark_magic' || weapon === 'holy_light' || weapon === 'nature_magic' || weapon === 'elemental_fire') {
        // Magic attack - spawn projectile
        attacker.attackDuration = 0.6;
        performMagicAttack(attacker, target);
    } else if (weapon === 'spear' || weapon === 'lance') {
        // Spear thrust
        attacker.attackDuration = 0.5;
        performSpearAttack(attacker);
    } else if (weapon === 'axe' || weapon === 'dual_axe' || weapon === 'greatsword') {
        // Heavy swing (axe, greatsword)
        attacker.attackDuration = 0.6;
        performAxeSwing(attacker);
    } else if (weapon === 'claw' || weapon === 'fist' || weapon === 'fang') {
        // Beast claw attack
        attacker.attackDuration = 0.4;
        performClawAttack(attacker);
    } else if (weapon === 'fire' || weapon === 'dragon') {
        // Dragon fire breath
        attacker.attackDuration = 1.0;
        performFireBreath(attacker, target);
    } else {
        // Default sword swing
        attacker.attackDuration = 0.5;
        performSwordSwing(attacker);
    }
    
    // Schedule damage at mid-animation
    setTimeout(() => {
        if (attacker.attackTarget && !attacker.attackTarget.dying) {
            dealDamage(attacker, attacker.attackTarget);
        }
    }, attacker.attackDuration * 400);
    
    // End attack
    setTimeout(() => {
        attacker.isAttacking = false;
        attacker.attackPhase = 0;
    }, attacker.attackDuration * 1000);
}

// Sword swing animation
function performSwordSwing(attacker) {
    const mesh = attacker.mesh;
    if (!mesh.userData.rightArm) return;
    
    const arm = mesh.userData.rightArm;
    const originalRot = { x: arm.rotation.x, y: arm.rotation.y, z: arm.rotation.z };
    
    // Wind up
    setTimeout(() => {
        arm.rotation.z = 1.2; // Pull back
        arm.rotation.x = -0.3;
    }, 0);
    
    // Swing forward
    setTimeout(() => {
        arm.rotation.z = -1.5; // Big swing
        arm.rotation.x = 0.5;
    }, attacker.attackDuration * 250);
    
    // Follow through
    setTimeout(() => {
        arm.rotation.z = -0.5;
        arm.rotation.x = 0.2;
    }, attacker.attackDuration * 500);
    
    // Return to idle
    setTimeout(() => {
        arm.rotation.x = originalRot.x;
        arm.rotation.y = originalRot.y;
        arm.rotation.z = originalRot.z;
    }, attacker.attackDuration * 800);
}

// Spear thrust animation
function performSpearAttack(attacker) {
    const mesh = attacker.mesh;
    if (!mesh.userData.weaponGroup) return;
    
    const weapon = mesh.userData.weaponGroup;
    const originalPos = { x: weapon.position.x, y: weapon.position.y, z: weapon.position.z };
    
    // Brace/ pull back
    setTimeout(() => {
        weapon.position.x -= 1.5;
        weapon.rotation.z = 0.8;
    }, 0);
    
    // Thrust forward
    setTimeout(() => {
        weapon.position.x = originalPos.x + 2;
        weapon.rotation.z = -0.8;
    }, attacker.attackDuration * 300);
    
    // Return
    setTimeout(() => {
        weapon.position.x = originalPos.x;
        weapon.position.y = originalPos.y;
        weapon.rotation.z = 0;
    }, attacker.attackDuration * 700);
}

// Axe swing animation
function performAxeSwing(attacker) {
    const mesh = attacker.mesh;
    if (!mesh.userData.weaponGroup) return;
    
    const weapon = mesh.userData.weaponGroup;
    const originalRot = { x: weapon.rotation.x, y: weapon.rotation.y, z: weapon.rotation.z };
    
    // Wind up high
    setTimeout(() => {
        weapon.rotation.x = -1.5;
        weapon.rotation.z = 1.0;
    }, 0);
    
    // Big swing down
    setTimeout(() => {
        weapon.rotation.x = 1.2;
        weapon.rotation.z = -1.5;
    }, attacker.attackDuration * 350);
    
    // Follow through
    setTimeout(() => {
        weapon.rotation.x = 0.3;
        weapon.rotation.z = -0.5;
    }, attacker.attackDuration * 600);
    
    // Return
    setTimeout(() => {
        weapon.rotation.x = originalRot.x;
        weapon.rotation.y = originalRot.y;
        weapon.rotation.z = originalRot.z;
    }, attacker.attackDuration * 850);
}

// Bow attack with arrow projectile
function performBowAttack(attacker, target) {
    const mesh = attacker.mesh;
    if (!mesh.userData.weaponGroup) return;
    
    const bow = mesh.userData.weaponGroup;
    
    // Draw bow
    setTimeout(() => {
        bow.rotation.z = -0.5;
    }, 0);
    
    // Hold at full draw
    setTimeout(() => {
        bow.rotation.z = -1.2;
        // Spawn arrow projectile
        spawnArrow(attacker, target);
    }, attacker.attackDuration * 400);
    
    // Release
    setTimeout(() => {
        bow.rotation.z = -0.3;
    }, attacker.attackDuration * 700);
}

// Spawn arrow projectile
function spawnArrow(attacker, target) {
    const arrowGroup = new THREE.Group();
    
    // Arrow shaft
    const shaftGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 4);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.rotation.z = Math.PI / 2;
    arrowGroup.add(shaft);
    
    // Arrow tip
    const tipGeo = new THREE.ConeGeometry(0.08, 0.2, 4);
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.8 });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.rotation.z = -Math.PI / 2;
    tip.position.x = 0.85;
    arrowGroup.add(tip);
    
    // Fletching
    const fletchGeo = new THREE.BoxGeometry(0.15, 0.08, 0.02);
    const fletchMat = new THREE.MeshStandardMaterial({ color: attacker.team === 'red' ? 0xCC3333 : 0x3366CC });
    const fletch1 = new THREE.Mesh(fletchGeo, fletchMat);
    fletch1.position.x = -0.6;
    arrowGroup.add(fletch1);
    
    arrowGroup.position.set(attacker.mesh.position.x, attacker.mesh.position.y + 4, attacker.mesh.position.z);
    
    // Point toward target
    const direction = new THREE.Vector3(
        target.mesh.position.x - attacker.mesh.position.x,
        0,
        target.mesh.position.z - attacker.mesh.position.z
    ).normalize();
    
    arrowGroup.lookAt(
        attacker.mesh.position.x + direction.x * 10,
        4,
        attacker.mesh.position.z + direction.z * 10
    );
    
    scene.add(arrowGroup);
    
    // Add to projectiles
    projectiles.push({
        mesh: arrowGroup,
        from: attacker,
        to: target,
        velocity: direction.multiplyScalar(2), // Arrow speed
        damage: attacker.attack,
        type: 'arrow',
        lifetime: 0,
        maxLifetime: 2000
    });
}

// Magic attack with projectile (fireball, etc.)
function performMagicAttack(attacker, target) {
    const mesh = attacker.mesh;
    
    // Get magic color based on unit type
    let magicColor = 0x9400D3; // Default purple
    if (attacker.type === 'healer' || attacker.type === 'priest' || attacker.type === 'cleric') magicColor = 0x00FF00;
    if (attacker.type === 'mage' || attacker.type === 'wizard') magicColor = 0x9400D3;
    if (attacker.type === 'elemental') magicColor = 0xFF4500;
    if (attacker.type === 'phoenix') magicColor = 0xFF6600;
    if (attacker.type === 'angel') magicColor = 0xFFD700;
    
    // Raise staff
    setTimeout(() => {
        if (mesh.userData.rightArm) {
            mesh.userData.rightArm.rotation.x = -0.8;
        }
    }, 0);
    
    // Cast spell
    setTimeout(() => {
        spawnMagicProjectile(attacker, target, magicColor);
    }, attacker.attackDuration * 400);
    
    // Lower staff
    setTimeout(() => {
        if (mesh.userData.rightArm) {
            mesh.userData.rightArm.rotation.x = 0;
        }
    }, attacker.attackDuration * 800);
}

// Spawn magic projectile
function spawnMagicProjectile(attacker, target, color) {
    const orbGroup = new THREE.Group();
    
    // Magic orb
    const orbGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const orbMat = new THREE.MeshStandardMaterial({ 
        color: color, 
        emissive: color, 
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orbGroup.add(orb);
    
    // Glow effect
    const glowGeo = new THREE.SphereGeometry(0.6, 8, 8);
    const glowMat = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.3 
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    orbGroup.add(glow);
    
    orbGroup.position.set(attacker.mesh.position.x, attacker.mesh.position.y + 4, attacker.mesh.position.z);
    
    const direction = new THREE.Vector3(
        target.mesh.position.x - attacker.mesh.position.x,
        0,
        target.mesh.position.z - attacker.mesh.position.z
    ).normalize();
    
    orbGroup.lookAt(
        attacker.mesh.position.x + direction.x * 10,
        4,
        attacker.mesh.position.z + direction.z * 10
    );
    
    scene.add(orbGroup);
    
    projectiles.push({
        mesh: orbGroup,
        from: attacker,
        to: target,
        velocity: direction.multiplyScalar(1.5),
        damage: attacker.attack,
        type: 'magic',
        lifetime: 0,
        maxLifetime: 2500,
        color: color
    });
}

// Dragon fire breath
function performFireBreath(attacker, target) {
    const mesh = attacker.mesh;
    
    // Face target
    mesh.lookAt(target.mesh.position.x, 0, target.mesh.position.z);
    
    // Charge up
    setTimeout(() => {
        // Spawn fire particles
        spawnFireBreath(attacker, target);
    }, attacker.attackDuration * 500);
}

// Spawn fire breath (multiple small projectiles)
function spawnFireBreath(attacker, target) {
    const direction = new THREE.Vector3(
        target.mesh.position.x - attacker.mesh.position.x,
        0,
        target.mesh.position.z - attacker.mesh.position.z
    ).normalize();
    
    // Spawn multiple fire particles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const fireGroup = new THREE.Group();
            
            const fireGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 6, 6);
            const fireMat = new THREE.MeshBasicMaterial({ 
                color: Math.random() > 0.5 ? 0xFF4500 : 0xFF6600,
                transparent: true,
                opacity: 0.8
            });
            const fire = new THREE.Mesh(fireGeo, fireMat);
            fireGroup.add(fire);
            
            fireGroup.position.set(
                attacker.mesh.position.x, 
                attacker.mesh.position.y + 4.5, 
                attacker.mesh.position.z
            );
            
            // Add some randomness to direction
            const fireDir = direction.clone();
            fireDir.x += (Math.random() - 0.5) * 0.3;
            fireDir.z += (Math.random() - 0.5) * 0.3;
            
            scene.add(fireGroup);
            
            projectiles.push({
                mesh: fireGroup,
                from: attacker,
                to: target,
                velocity: fireDir.normalize().multiplyScalar(2),
                damage: attacker.attack / 3, // Each particle does less
                type: 'fire',
                lifetime: 0,
                maxLifetime: 1000
            });
        }, i * 50);
    }
}

// Claw attack for beasts
function performClawAttack(attacker) {
    const mesh = attacker.mesh;
    if (!mesh.userData.rightArm) return;
    
    const arm = mesh.userData.rightArm;
    
    // Swipe motion
    setTimeout(() => {
        arm.rotation.x = -0.8;
        arm.rotation.z = 0.5;
    }, 0);
    
    setTimeout(() => {
        arm.rotation.x = 1.0;
        arm.rotation.z = -0.8;
    }, attacker.attackDuration * 350);
    
    setTimeout(() => {
        arm.rotation.x = 0;
        arm.rotation.z = 0;
    }, attacker.attackDuration * 700);
}

// Update projectiles
function updateProjectiles(delta) {
    projectiles = projectiles.filter(proj => {
        proj.lifetime += delta * 1000;
        
        if (proj.lifetime > proj.maxLifetime) {
            scene.remove(proj.mesh);
            return false;
        }
        
        // Move projectile
        proj.mesh.position.x += proj.velocity.x;
        proj.mesh.position.y += proj.velocity.y;
        proj.mesh.position.z += proj.velocity.z;
        
        // Add arc for arrows
        if (proj.type === 'arrow') {
            proj.mesh.position.y -= 0.02; // Gravity
        }
        
        // Check collision with target
        const target = proj.to;
        if (target && !target.dying) {
            const dist = Math.sqrt(
                Math.pow(proj.mesh.position.x - target.mesh.position.x, 2) +
                Math.pow(proj.mesh.position.z - target.mesh.position.z, 2)
            );
            
            if (dist < 3) {
                // Hit!
                dealDamage(proj.from, target);
                
                // Impact effect
                createImpactEffect(proj.mesh.position, proj.type, proj.color);
                
                scene.remove(proj.mesh);
                return false;
            }
        }
        
        // Remove if too far
        const mapSize = MAPS[currentMap].size;
        if (Math.abs(proj.mesh.position.x) > mapSize/2 || 
            Math.abs(proj.mesh.position.z) > mapSize/2) {
            scene.remove(proj.mesh);
            return false;
        }
        
        return true;
    });
}

// Create impact effect
function createImpactEffect(position, type, color) {
    // Simple flash
    const flashGeo = new THREE.SphereGeometry(0.5, 8, 8);
    const flashMat = new THREE.MeshBasicMaterial({ 
        color: color || 0xFFFFFF,
        transparent: true,
        opacity: 0.8
    });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    flash.position.copy(position);
    scene.add(flash);
    
    // Fade out and remove
    let opacity = 0.8;
    const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        flash.material.opacity = opacity;
        flash.scale.multiplyScalar(1.1);
        
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            scene.remove(flash);
        }
    }, 30);
}

// Deal damage to target
function dealDamage(attacker, target) {
    if (target.dying) return;
    
    target.hp -= attacker.attack;
    
    // Update health bar
    if (target.healthGroup) {
        const health = target.healthGroup.userData.health;
        const healthMat = target.healthGroup.userData.healthMat;
        const pct = Math.max(0, target.hp / target.maxHp);
        health.scale.x = pct;
        health.position.x = -(4 * (1 - pct)) / 2;
        
        if (pct > 0.6) healthMat.color.setHex(0x27ae60);
        else if (pct > 0.3) healthMat.color.setHex(0xf39c12);
        else healthMat.color.setHex(0xe74c3c);
    }
    
    // Hit reaction
    target.mesh.position.z -= 0.5;
    setTimeout(() => { target.mesh.position.z += 0.5; }, 100);
    
    // Flash effect
    target.mesh.traverse(child => {
        if (child.material && child.material.emissive) {
            child.material.emissive = new THREE.Color(0xff0000);
            child.material.emissiveIntensity = 0.5;
            setTimeout(() => {
                child.material.emissive = new THREE.Color(0x000000);
                child.material.emissiveIntensity = 0;
            }, 100);
        }
    });
    
    if (target.hp <= 0) {
        target.dying = true;
        target.mesh.rotation.x = Math.PI / 2;
        updateStats();
    }
}

let currentLevel = 1;

function checkWinCondition() {
    const redAlive = units.filter(u => u.team === 'red' && !u.dying).length;
    const blueAlive = units.filter(u => u.team === 'blue' && !u.dying).length;
    
    if (redAlive === 0 || blueAlive === 0) {
        isBattling = false;
        clearInterval(gameLoop);
        const winner = redAlive > 0 ? 'red' : 'blue';
        
        if (winner === 'red') {
            if (gameMode === 'campaign') {
                // Campaign - show next level button
                winnerText.innerHTML = `🔴 Level ${currentLevel} Complete!<br><button id="nextLevelBtn" style="margin-top:15px;padding:12px 30px;font-size:18px;font-weight:bold;cursor:pointer;background:linear-gradient(135deg,#27ae60,#1e8449);color:white;border:none;border-radius:8px;box-shadow:0 4px 15px rgba(39,174,96,0.4);transition:transform 0.2s;">Next Level ▶</button>`;
                winnerText.className = 'red-wins';
                winnerOverlay.classList.remove('hidden');
                
                // Add next level button handler
                setTimeout(() => {
                    const nextBtn = document.getElementById('nextLevelBtn');
                    if (nextBtn) {
                        nextBtn.addEventListener('click', () => {
                            winnerOverlay.classList.add('hidden');
                            startNextLevel();
                        });
                    }
                }, 100);
            } else {
                // Sandbox - just red team wins
                winnerText.textContent = '🔴 Red Team Wins!';
                winnerText.className = 'red-wins';
                winnerOverlay.classList.remove('hidden');
            }
        } else {
            // Player lost
            if (gameMode === 'campaign') {
                winnerText.textContent = '🔵 You Lost!';
            } else {
                winnerText.textContent = '🔵 Blue Team Wins!';
            }
            winnerText.className = 'blue-wins';
            winnerOverlay.classList.remove('hidden');
        }
    }
}

function startNextLevel() {
    currentLevel++;
    
    // Clean up old scene properly
    if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    }
    units = [];
    
    // Reset camera
    cameraAngle = 0;
    cameraDistance = 80;
    cameraHeight = 80;
    
    // Reinitialize THREE.js
    initThreeJS();
    
    // Re-setup event listeners for the new renderer
    setupEventListeners();
    
    // Give more money - scales with level
    campaignMoney = 350 + (currentLevel * 50);
    redMoney = campaignMoney;
    blueMoney = 0;
    
    // Clear old money display and recreate
    const oldMoneyDiv = document.getElementById('moneyDisplay');
    if (oldMoneyDiv) oldMoneyDiv.remove();
    
    // Update display
    updateCampaignMoneyDisplay();
    
    // Calculate enemy count based on level - scales progressively
    let enemyCount;
    if (currentLevel <= 3) enemyCount = 2;
    else if (currentLevel <= 5) enemyCount = 3;
    else if (currentLevel <= 10) enemyCount = 4;
    else if (currentLevel <= 20) enemyCount = 5;
    else if (currentLevel <= 30) enemyCount = 6;
    else if (currentLevel <= 50) enemyCount = 7;
    else enemyCount = 8 + Math.floor((currentLevel - 50) / 25); // Cap at ~12 for very high levels
    
    // Determine enemy types based on level - progressively harder
    const enemyTypes = [];
    
    // Level 1-2: Just soldiers
    if (currentLevel <= 2) {
        for (let i = 0; i < enemyCount; i++) enemyTypes.push('soldier');
    }
    // Level 3-4: Soldiers and some knights
    else if (currentLevel <= 4) {
        for (let i = 0; i < enemyCount; i++) {
            enemyTypes.push(Math.random() < 0.5 ? 'soldier' : 'knight');
        }
    }
    // Level 5-9: Mix of soldiers, knights, warriors
    else if (currentLevel <= 9) {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.3) enemyTypes.push('soldier');
            else if (r < 0.6) enemyTypes.push('knight');
            else enemyTypes.push('warrior');
        }
    }
    // Level 10-19: Add barbarians and archers
    else if (currentLevel <= 19) {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.25) enemyTypes.push('soldier');
            else if (r < 0.45) enemyTypes.push('knight');
            else if (r < 0.65) enemyTypes.push('warrior');
            else if (r < 0.8) enemyTypes.push('barbarian');
            else enemyTypes.push('archer');
        }
    }
    // Level 20-39: Add pikemen, berserkers, crossbowmen
    else if (currentLevel <= 39) {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.15) enemyTypes.push('soldier');
            else if (r < 0.3) enemyTypes.push('knight');
            else if (r < 0.45) enemyTypes.push('warrior');
            else if (r < 0.6) enemyTypes.push('barbarian');
            else if (r < 0.75) enemyTypes.push('archer');
            else if (r < 0.85) enemyTypes.push('pikeman');
            else enemyTypes.push('berserker');
        }
    }
    // Level 40-69: Add mages, champions
    else if (currentLevel <= 69) {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.1) enemyTypes.push('knight');
            else if (r < 0.2) enemyTypes.push('warrior');
            else if (r < 0.35) enemyTypes.push('barbarian');
            else if (r < 0.5) enemyTypes.push('archer');
            else if (r < 0.6) enemyTypes.push('pikeman');
            else if (r < 0.75) enemyTypes.push('berserker');
            else if (r < 0.85) enemyTypes.push('mage');
            else enemyTypes.push('champion');
        }
    }
    // Level 70-99: Add golems, assassins
    else if (currentLevel <= 99) {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.15) enemyTypes.push('warrior');
            else if (r < 0.3) enemyTypes.push('barbarian');
            else if (r < 0.45) enemyTypes.push('archer');
            else if (r < 0.55) enemyTypes.push('berserker');
            else if (r < 0.65) enemyTypes.push('mage');
            else if (r < 0.75) enemyTypes.push('champion');
            else if (r < 0.85) enemyTypes.push('golem');
            else enemyTypes.push('assassin');
        }
    }
    // Level 100+: Add dragons, demons, vampires
    else {
        for (let i = 0; i < enemyCount; i++) {
            const r = Math.random();
            if (r < 0.15) enemyTypes.push('archer');
            else if (r < 0.25) enemyTypes.push('mage');
            else if (r < 0.35) enemyTypes.push('champion');
            else if (r < 0.5) enemyTypes.push('golem');
            else if (r < 0.65) enemyTypes.push('assassin');
            else if (r < 0.8) enemyTypes.push('vampire');
            else if (r < 0.9) enemyTypes.push('demon');
            else enemyTypes.push('dragon');
        }
    }
    
    // Spawn enemies
    for (let i = 0; i < enemyCount; i++) {
        addUnit(40 + Math.random() * 30, -30 + Math.random() * 60, enemyTypes[i], 'blue');
    }
    
    battleStatus.textContent = `Level ${currentLevel} - Place your units! (Enemies: ${enemyCount})`;
    startBtn.disabled = false;
    updateStats();
}

function resetGame() {
    // Return to main menu
    isBattling = false;
    clearInterval(gameLoop);
    
    // Clean up renderer
    if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    }
    
    // Reset game state
    units = [];
    gameMode = null;
    
    // Hide game, show main menu
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    winnerOverlay.classList.add('hidden');
}

// Clear field - different behavior per mode
function clearField() {
    isBattling = false;
    clearInterval(gameLoop);
    
    if (gameMode === 'sandbox') {
        // Sandbox: Clear ALL units (red and blue)
        units.forEach(unit => scene.remove(unit.mesh));
        units = [];
        
        redMoney = sandboxMoney;
        blueMoney = sandboxMoney;
        updateMoneyDisplay();
        battleStatus.textContent = 'All units cleared!';
    } else if (gameMode === 'campaign') {
        // Campaign: Only clear YOUR units (red), keep enemies
        const enemyUnits = units.filter(u => u.team === 'blue');
        const yourUnits = units.filter(u => u.team === 'red');
        
        yourUnits.forEach(unit => scene.remove(unit.mesh));
        units = enemyUnits;
        
        redMoney = campaignMoney;
        
        // Clear old money display and recreate
        const oldMoneyDiv = document.getElementById('moneyDisplay');
        if (oldMoneyDiv) oldMoneyDiv.remove();
        
        updateCampaignMoneyDisplay();
        battleStatus.textContent = 'Your units cleared! Enemies remain.';
    }
    
    startBtn.disabled = false;
    winnerOverlay.classList.add('hidden');
    updateStats();
}

// ==================== ANIMATION LOOP ====================
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Update projectiles
    if (isBattling) {
        updateProjectiles(delta);
    }
    
    units.forEach(unit => {
        const mesh = unit.mesh;
        
        if (unit.dying) {
            // Death animation - fall down and fade
            mesh.position.y -= 0.08;
            mesh.rotation.x += 0.05;
            // Fade out
            mesh.traverse(child => {
                if (child.material) {
                    child.material.transparent = true;
                    child.material.opacity = Math.max(0, 1 - unit.dyingTime);
                }
            });
        } else if (unit.moving) {
            // Walking animation - leg swing
            unit.animTimer += delta * 8;
            const swing = Math.sin(unit.animTimer) * 0.4;
            
            if (mesh.userData.leftLeg) {
                mesh.userData.leftLeg.rotation.x = swing;
                mesh.userData.rightLeg.rotation.x = -swing;
                // Arm swing
                mesh.userData.leftArm.rotation.x = -swing * 0.5;
                mesh.userData.rightArm.rotation.x = swing * 0.5;
            }
            mesh.position.y = Math.abs(Math.sin(unit.animTimer)) * 0.2;
        } else {
            // Idle animation - subtle breathing
            unit.animTimer += delta * 2;
            const breath = Math.sin(unit.animTimer) * 0.03;
            
            // Subtle body bob
            mesh.position.y = breath;
            
            // Reset limbs
            if (mesh.userData.leftLeg) {
                mesh.userData.leftLeg.rotation.x = 0;
                mesh.userData.rightLeg.rotation.x = 0;
                mesh.userData.leftArm.rotation.x = 0;
                mesh.userData.rightArm.rotation.x = 0;
            }
        }
        
        // Attack animation
        if (unit.animState === 'attacking') {
            unit.animTimer -= delta * 10;
            if (mesh.userData.rightArm) {
                const attackSwing = Math.sin(unit.animTimer * Math.PI) * 1.5;
                mesh.userData.rightArm.rotation.x = attackSwing;
                mesh.userData.rightArm.rotation.z = -0.5 - Math.abs(attackSwing) * 0.3;
            }
            if (unit.animTimer <= 0) {
                unit.animState = unit.moving ? 'walking' : 'idle';
            }
        }
        
        // Update health bar position and look at camera
        if (unit.healthGroup) {
            unit.healthGroup.position.y = 6.5 + (mesh.position.y * 0.5);
            unit.healthGroup.lookAt(camera.position);
        }
    });
    
    renderer.render(scene, camera);
}

// Start
window.addEventListener('load', init);

// Instructions
window.addEventListener('load', () => {
    const btn = document.getElementById('instructionsBtn');
    const modal = document.getElementById('instructionsModal');
    const close = document.getElementById('closeInstructions');
    
    if (btn && modal) {
        btn.addEventListener('click', () => modal.classList.remove('hidden'));
        close?.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }
});

// Profile Management
class ProfileManager {
    constructor() {
        this.profiles = this.loadProfiles();
        this.currentProfile = null;
    }

    loadProfiles() {
        const stored = localStorage.getItem('astroblurb_profiles');
        return stored ? JSON.parse(stored) : [];
    }

    saveProfiles() {
        localStorage.setItem('astroblurb_profiles', JSON.stringify(this.profiles));
    }

    addProfile(profile) {
        profile.id = Date.now().toString();
        profile.createdAt = new Date().toISOString();
        this.profiles.push(profile);
        this.saveProfiles();
        return profile;
    }

    deleteProfile(id) {
        this.profiles = this.profiles.filter(p => p.id !== id);
        this.saveProfiles();
    }

    getProfile(id) {
        return this.profiles.find(p => p.id === id);
    }
}

// Blurb Templates (will be database-backed later)
const DEFAULT_BLURBS = [
    {
        id: 1,
        text: "I am @sun but my emotions are rather @moon. I think in a @mercury way, but express my energy in a @mars way. In love, I seek @venus. I take on the role of @rising.",
        author: "zodiac--signs.tumblr.com",
        replacements: {
            sun: ['an initiator','a guardian','a wanderer','a psychic','a warrior','a mastermind','a peacemaker','a detective','an explorer','an entrepreneur','a visionary','a dreamer', ],
            moon: ['intense','enduring','sparkling','deep','vibrant','composed','whimsical','overwhelming','vivid','guarded','unpredictable','extreme'],
            mercury: ['direct','practical','lighthearted','intuitive','dynamic','fruitful','artistical','complex','curious','purposeful','logical','vague'],
            mars: ['combative','abiding','erratic','protective','powerful','efficient','passive','brooding','lively','focused','analytical','creative'],
            venus: ['passion','commitment','stimulation','security','affection','respect','support','devotion','excitement','intensity','understanding','stability'],
            rising: ['the pioneer','the owner','the messenger','the nurturer','the protector','the organizer','the aesthete','the mystic','the comedian','the old soul','the outlaw','the creator']
        }
    },
    {
        id: 2,
        text: "You're just a @moon @sun who acts like they're a @venus @mars.",
        author: "AstroBlurb",
        replacements: {
            moon: ["hyperactive", "relentless", "talkative", "loving", "dramatic", "dedicated", "charming", "intense", "adventurous", "ambitious", "erratic", "easy-going"],
            sun: ["clown", "sloth", "chatter-box", "hermit-crab", "drama queen", "buzz-kill", "fence-sitter", "edge-lord", "dilettante", "workaholic", "weirdo", "tadpole"], 
            venus: ["passionate", "dependable", "popular", "empathic", "famous", "innocent", "posh", "pioneering", "global", "successful", "revolutionary", "tortured"], 
            mars: ["hero", "bull", "comedian", "child", "celebrity", "martyr", "expert", "detective", "philosopher", "CEO", "prophet", "healer"]
        }
    },
    {
        id: 3,
        text: "I am a @sun in @sunH, but I @moon in @moonH. I act @mars, but struggle with @chiron @chironH.",
        author: "AstroBlurb",
        replacements: {
            sun: ["warrior", "builder", "communicator", "nurturer", "leader", "healer", "mediator", "transformer", "explorer", "achiever", "innovator", "dreamer"],
            sunH: ["my identity", "my resources", "my communication", "the home", "my creativity", "my work", "my relationships", "deep waters", "my beliefs", "my career", "my community", "my solitude"],
            moon: ["fight back", "hold steady", "overthink", "feel deeply", "perform", "analyze", "people-please", "dive deep", "wander", "control", "detach", "flow"],
            moonH: ["who I am", "what I have", "what I say", "where I belong", "what I create", "my daily life", "my partnerships", "my transformations", "my philosophy", "my work life", "my friendships", "my subconscious"],
            mars: ["aggressive", "stubborn", "quick-witted", "protective", "confident", "critical", "diplomatic", "intense", "blunt", "calculating", "rebellious", "passive"],
            chiron: ["personal", "material", "intellectual", "emotional", "public", "domestic", "relational", "obsessive", "existential", "career", "human", "spiritual"],
            chironH: ["identity", "stability", "communication", "crises", "showmanship", "service", "intimacy", "power trips", "growth", "ambition", "connection", "isolation"]
        }
    },
    {
        id: 4,
        text: "I think like a @mercury, dream like a @moon, and love like a @venus.",
        author: "AstroBlurb",
        replacements: {
            mercury: ["warrior", "pragmatist", "butterfly", "poet", "performer", "analyst", "diplomat", "detective", "philosopher", "strategist", "inventor", "mystic"],
            moon: ["fighter", "creature of comfort", "chameleon", "mother hen", "future celebrity", "helper", "socialite", "phoenix", "wanderer", "mountain", "alien", "ocean"],
            venus: ["wildfire", "romantic traditionalist", "flirt", "devoted protector", "dramatic lover", "perfectionist partner", "harmonious soul", "all-or-nothing lover", "free spirit", "steady partner", "unconventional heart", "selfless romantic"]
        }
    },
    {
    id: 5,
    text: "My power lies in @plutoH, I assert myself through @mars, but I refuse to be tamed in my @lilith.",
    author: "AstroBlurb",
    replacements: {
        plutoH: ["who I am", "what I own", "what I say", "my roots", "my creativity", "my service", "my relationships", "my sexuality", "my beliefs", "my reputation", "my ideals", "self-awareness"],
        mars: ["direct combat", "stubborn resistance", "sharp words", "emotional tests", "grand gestures", "meticulous action", "strategic compromise", "psychological warfare", "bold adventure", "calculated steps", "revolutionary action", "subtle sabotage"],
        lilith: ["raw identity", "material desires", "unfiltered speech", "primal needs", "sexual expression", "bodily autonomy", "partnership demands", "dark desires", "wild freedom", "ambitious hunger", "radical authenticity", "spiritual rebellion"]
        }
    },
    {
        id: 6,
        text: "I've transformed through @plutoH. When threatened, I @mars like a @lilith, even though my deepest wound is @chironH.",
        author: "AstroBlurb",
        replacements: {
            plutoH: ["reinventing myself", "survival", "speaking truth", "family trauma", "creative rebirth", "health crises", "relationship deaths", "sexual awakening", "existential shifts", "career destruction", "collective movements", "spiritual dissolution"],
            mars: ["charge forward", "stand firm", "talk back", "defend emotionally", "perform loudly", "serve perfectly", "negotiate carefully", "strike deep", "escape freely", "strategize coldly", "rebel openly", "withdraw mysteriously"],
            lilith: ["wild animal", "unstoppable force", "silver tongue", "fierce mother", "diva", "pure vessel", "rebel queen", "dark priestess", "free spirit", "power player", "alien", "witch"],
            chironH: ["self-loathing", "worthlessness", "being misunderstood", "abandonment", "seeking validation", "never enough", "losing myself", "betrayal", "feeling caged", "failure", "not belonging", "invisibility"]
        }
    },
    {
        id: 7,
        text: "I find joy through @jupiter @jupiterH, my @venus heart craves @venusH, but my @moon side needs @moonH to feel safe.",
        author: "AstroBlurb",
        replacements: {
            jupiter: ["pioneering", "building", "discussing", "nurturing", "displaying", "perfecting", "connecting with", "transforming", "exploring", "mastering", "innovating in", "transcending through"],
            jupiterH: ["new paths", "my resources", "new subjects", "my home life", "my talents", "my work", "my relationships", "the depths", "new places", "my career", "my community", "my spirituality"],
            venus: ["impulsive", "sensual", "curious", "tender", "proud", "discerning", "romantic", "obsessive", "adventurous", "traditional", "detached", "dreamy"],
            venusH: ["validation", "security", "variety", "belonging", "admiration", "usefulness", "partnership", "merger", "freedom", "respect", "friendship", "unconditional love"],
            moon: ["reactive", "comfort-seeking", "restless", "sensitive", "dramatic", "anxious", "harmonious", "intense", "optimistic", "emotionally-guarded", "independent", "empathetic"],
            moonH: ["independence", "stability", "stimulation", "privacy", "spotlight", "routine", "companionship", "intensity", "adventure", "structure", "community", "solitude"]
        }
    },
    {
        id: 8,
        text: "My @mercury mind works through @mercuryH. @saturn taught me discipline in @saturnH, while @neptune dissolves boundaries in @neptuneH. I nurture by @ceres @ceresH.",
        author: "AstroBlurb",
        replacements: {
            mercury: ["reactive", "methodical", "rapid-fire", "intuitive", "performative", "analytical", "balanced", "probing", "philosophical", "strategic", "innovative", "poetic"],
            mercuryH: ["self-talk", "resource management", "daily conversations", "family dynamics", "creative projects", "problem-solving", "negotiations", "research", "belief systems", "career planning", "group brainstorming", "meditation"],
            saturn: ["Independence", "Self-worth", "Communication", "Emotional security", "Self-expression", "Perfectionism", "Relationships", "Control", "Meaning", "Achievement", "Belonging", "Boundaries"],
            saturnH: ["my identity", "my finances", "my education", "my home", "my hobbies", "my job", "my marriage", "my sexuality", "my worldview", "my reputation", "my friendships", "my inner world"],
            neptune: ["ego", "materialism", "facts", "defenses", "performances", "criticism", "people-pleasing", "power", "dogma", "my work", "individuality", "reality"],
            neptuneH: ["who I am", "what I own", "what I think", "where I live", "what I love", "how I serve", "who I love", "what I fear", "what I believe", "who I become", "how I connect", "where I hide"],
            ceres: ["fighting for", "providing for", "teaching", "protecting", "celebrating", "organising", "partnering with", "transforming", "exploring with", "guiding", "liberating", "healing"],
            ceresH: ["myself", "my loved ones", "others", "my home", "my creations", "those in need", "my partner", "others", "my students", "my community", "the oppressed", "the wounded"]
        }
    },
    {
        id: 9,
        text: "I'm a @sun at my core, but @uranusH makes @uranus complicated. My commitment style is @juno, though my @mars energy gets expressed through @marsH.",
        author: "AstroBlurb",
        replacements: {
            sun: ["warrior", "hedonist", "storyteller", "caregiver", "performer", "craftsperson", "diplomat", "alchemist", "philosopher", "architect", "revolutionary", "mystic"],
            uranusH: ["reinventing myself", "financial chaos", "disruptive ideas", "family rebellion", "creative genius", "work revolution", "relationship upheaval", "sexual desire", "changing beliefs", "career change", "non-conformity", "mystical awakening"],
            uranus: ["my identity", "my values", "communication", "family life", "creativity", "my health", "my relationships", "intimacy", "my beliefs", "my career", "my friendships", "spirituality"],
            juno: ["independent", "loyal", "intellectual", "nurturing", "passionate", "practical", "balanced", "intense", "freedom-loving", "committed", "unconventional", "spiritual"],
            mars: ["direct", "steady", "witty", "protective", "bold", "precise", "fair", "strategic", "spontaneous", "controlled", "rebellious", "intuitive"],
            marsH: ["self-assertion", "earning money", "debates", "building my nest", "creative passion", "daily tasks", "partnership conflicts", "power struggles", "activism", "career ambition", "social causes", "hidden anger"]
        }
    },
    {
        id: 10,
        text: "I am naturally @lifepath, and my purpose is @northnode through @northnodeH. In this life I will transform @plutoH, express identity in @sunH, while overcoming @saturnH @saturn.",
        author: "AstroBlurb",
        replacements: {
            lifepath: ["an independent leader", "a diplomatic peacemaker", "a creative communicator", "a practical builder", "a freedom-loving adventurer", "a nurturing caretaker", "a spiritual seeker", "an ambitious achiever", "a humanitarian helper", "an intuitive visionary", "a master builder", "a master teacher"],
            northnode: ["pioneering", "stabilizing", "communicating", "nurturing", "creating", "serving", "connecting", "transforming", "expanding", "achieving", "innovating", "transcending"],
            northnodeH: ["self-discovery", "cultivating self-worth", "learning and teaching", "building roots", "creative self-expression", "healing service", "authentic partnership", "deep intimacy", "higher learning", "public contribution", "community building", "spiritual surrender"],
            plutoH: ["my identity and ego", "my relationship with money", "how I communicate", "my family patterns", "my creative power", "my daily habits", "my intimate bonds", "my sexual nature", "my belief systems", "my career ambitions", "my social circles", "my hidden fears"],
            sunH: ["the spotlight", "material stability", "intellectual pursuits", "domestic life", "creative projects", "service work", "one-on-one connections", "shadow integration", "philosophical exploration", "professional achievement", "group dynamics", "solitary reflection"],
            saturnH: ["self-doubt", "financial insecurity", "communication anxiety", "family obligations", "creative blocks", "health perfectionism", "relationship fears", "intimacy walls", "dogmatic thinking", "success pressure", "isolation tendencies", "existential confusion"],
            saturn: ["through impatient action", "with material security fears", "around communication barriers", "via emotional walls", "in creative confidence", "through perfectionist tendencies", "in relationship commitment", "with control and vulnerability", "around rigid beliefs", "through authority and ambition", "in belonging and detachment", "with boundaries and escapism"]
        }
    }
];

// State
const profileManager = new ProfileManager();
let currentChart = null;
let currentView = 'blurbs'; // 'blurbs' or 'chart'
let customBlurbs = JSON.parse(localStorage.getItem('custom_blurbs') || '[]');
let deletedBlurbs = JSON.parse(localStorage.getItem('deleted_blurbs') || '[]');
let deletedDefaultBlurbIds = JSON.parse(localStorage.getItem('deleted_default_blurb_ids') || '[]');
let generatedBlurbs = JSON.parse(localStorage.getItem('generated_blurbs') || '[]');
let profileFilters = {}; // { profileName: null | 'exclude' | 'include' }
let templateFilters = {}; // { templateId: null | 'exclude' | 'include' }
let modalCounter = 0;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    loadProfileList();
    loadBlurbList();
    
    // If we have profiles, show blurbs section and auto-generate
    if (profileManager.profiles.length > 0) {
        document.getElementById('blurbsSection').style.display = 'block';
        document.getElementById('loading').style.display = 'block';
        try {
            await autoGenerateAllBlurbs();
        } catch (error) {
            console.error('Error auto-generating blurbs:', error);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }
    
    refreshGeneratedBlurbs();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('newProfileBtn').addEventListener('click', showProfileForm);
    document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
    document.getElementById('cancelProfile').addEventListener('click', hideProfileForm);
    document.getElementById('location').addEventListener('input', handleLocationSearch);
    
    // Blurb creation - now using modal
    document.getElementById('newBlurbBtn').addEventListener('click', showBlurbForm);
}

// Profile UI
function showProfileForm() {
    document.getElementById('profileFormCard').style.display = 'block';
    document.getElementById('profilesList').style.display = 'none';
}

function hideProfileForm() {
    document.getElementById('profileFormCard').style.display = 'none';
    document.getElementById('profilesList').style.display = 'block';
    document.getElementById('profileForm').reset();
    selectedLocationData = null;
    document.getElementById('selectedLocation').innerHTML = '';
}

function loadProfileList() {
    const container = document.getElementById('profilesContainer');
    const profiles = profileManager.profiles;
    
    if (profiles.length === 0) {
        container.innerHTML = '<p class="empty-state">No profiles yet. Create your first one!</p>';
        document.getElementById('blurbsSection').style.display = 'none';
        return;
    }
    
    container.innerHTML = profiles.map(profile => `
        <div class="profile-card">
            <h3>${profile.name}</h3>
            <p>${new Date(profile.datetime).toLocaleDateString()}</p>
            <p class="location-small">${profile.location.split(',')[0]}</p>
            <div class="profile-actions">
                <button onclick="viewChart('${profile.id}')" class="btn-small btn-secondary">View Chart</button>
                <button onclick="deleteProfile('${profile.id}')" class="btn-small btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
    
    // Show blurbs section if we have profiles
    document.getElementById('blurbsSection').style.display = 'block';
}

// Auto-generate blurbs for all profiles and all templates
async function autoGenerateAllBlurbs() {
    const profiles = profileManager.profiles;
    if (profiles.length === 0) return;
    
    // Get all active templates
    const activeDefaultBlurbs = DEFAULT_BLURBS.filter(b => !deletedDefaultBlurbIds.includes(b.id));
    const activeCustomBlurbs = customBlurbs.filter(b => !deletedBlurbs.find(d => d.id === b.id));
    const allTemplates = [...activeDefaultBlurbs, ...activeCustomBlurbs];
    
    // Generate blurbs for each profile × template combination
    for (const profile of profiles) {
        // Get chart for this profile
        const response = await fetch('/api/chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                datetime: profile.datetime,
                latitude: profile.latitude,
                longitude: profile.longitude,
                timezone: profile.timezone,
                location: profile.location
            })
        });
        
        if (!response.ok) continue;
        
        const chart = await response.json();
        chart.profileName = profile.name;
        chart.profileId = profile.id;
        
        // Generate with each template
        for (const template of allTemplates) {
            // Check if this combination already exists
            const exists = generatedBlurbs.some(gb => 
                gb.profileId === profile.id && 
                gb.blurbTemplate.id === template.id
            );
            
            if (!exists) {
                await generateBlurbForProfile(chart, template);
            }
        }
    }
}

// Generate a single blurb for a profile with a template
async function generateBlurbForProfile(chart, blurbObj) {
    try {
        const response = await fetch('/api/blurb/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chart: chart,
                blurbTemplate: blurbObj.text,
                replacements: blurbObj.replacements || {}
            })
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        
        const blurbData = {
            id: Date.now() + Math.random(), // Ensure unique ID
            text: data.blurb,
            original: blurbObj.text,
            profileName: chart.profileName,
            profileId: chart.profileId,
            blurbTemplate: blurbObj,
            timestamp: new Date().toISOString()
        };
        
        generatedBlurbs.unshift(blurbData);
        localStorage.setItem('generated_blurbs', JSON.stringify(generatedBlurbs));
    } catch (error) {
        console.error('Error generating blurb:', error);
    }
}

// Generate blurbs for a newly added profile
async function generateBlurbsForNewProfile(profile) {
    // Get all active templates
    const activeDefaultBlurbs = DEFAULT_BLURBS.filter(b => !deletedDefaultBlurbIds.includes(b.id));
    const activeCustomBlurbs = customBlurbs.filter(b => !deletedBlurbs.find(d => d.id === b.id));
    const allTemplates = [...activeDefaultBlurbs, ...activeCustomBlurbs];
    
    // Get chart for this profile
    const response = await fetch('/api/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            datetime: profile.datetime,
            latitude: profile.latitude,
            longitude: profile.longitude,
            timezone: profile.timezone,
            location: profile.location
        })
    });
    
    if (!response.ok) return;
    
    const chart = await response.json();
    chart.profileName = profile.name;
    chart.profileId = profile.id;
    
    // Generate with each template
    for (const template of allTemplates) {
        await generateBlurbForProfile(chart, template);
    }
}

// Generate blurbs for a newly added template across all profiles
async function generateBlurbsForNewTemplate(template) {
    const profiles = profileManager.profiles;
    if (profiles.length === 0) return;
    
    // Generate blurbs for each profile with this template
    for (const profile of profiles) {
        // Get chart for this profile
        const response = await fetch('/api/chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                datetime: profile.datetime,
                latitude: profile.latitude,
                longitude: profile.longitude,
                timezone: profile.timezone,
                location: profile.location
            })
        });
        
        if (!response.ok) continue;
        
        const chart = await response.json();
        chart.profileName = profile.name;
        chart.profileId = profile.id;
        
        await generateBlurbForProfile(chart, template);
    }
}

function deleteProfile(id) {
    if (confirm('Are you sure you want to delete this profile?')) {
        const profile = profileManager.getProfile(id);
        const profileName = profile?.name;
        
        // Delete the profile
        profileManager.deleteProfile(id);
        
        // Remove all generated blurbs for this profile
        if (profileName) {
            generatedBlurbs = generatedBlurbs.filter(blurb => blurb.profileId !== id);
            localStorage.setItem('generated_blurbs', JSON.stringify(generatedBlurbs));
            
            // Remove from profile filters
            delete profileFilters[profileName];
        }
        
        // Refresh UI
        loadProfileList();
        refreshGeneratedBlurbs();
        
        // If this was the current chart, hide blurbs section
        if (currentChart?.profileId === id) {
            currentChart = null;
            document.getElementById('blurbsSection').style.display = 'none';
            document.getElementById('chartSection').style.display = 'none';
        }
    }
}

async function handleProfileSubmit(e) {
    e.preventDefault();
    
    if (!selectedLocationData) {
        alert('Please select a location from the search results');
        return;
    }
    
    const profile = {
        name: document.getElementById('profileName').value,
        datetime: `${document.getElementById('date').value}T${document.getElementById('time').value}`,
        latitude: selectedLocationData.lat,
        longitude: selectedLocationData.lon,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        location: selectedLocationData.name
    };
    
    const newProfile = profileManager.addProfile(profile);
    loadProfileList();
    hideProfileForm();
    
    // Auto-generate blurbs for the new profile
    document.getElementById('loading').style.display = 'block';
    try {
        await generateBlurbsForNewProfile(newProfile);
        refreshGeneratedBlurbs();
    } catch (error) {
        console.error('Error generating blurbs for new profile:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// Location search (same as before)
let selectedLocationData = null;
let searchTimeout = null;

function handleLocationSearch(e) {
    const query = e.target.value.trim();
    
    if (query.length < 3) {
        document.getElementById('locationResults').innerHTML = '';
        return;
    }
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => searchLocation(query), 500);
}

async function searchLocation(query) {
    const resultsDiv = document.getElementById('locationResults');
    resultsDiv.innerHTML = '<div class="loading-small">Searching...</div>';
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        
        if (data.length === 0) {
            resultsDiv.innerHTML = '<div class="no-results">No locations found</div>';
            return;
        }
        
        resultsDiv.innerHTML = data.map(location => `
            <div class="location-item" data-location='${JSON.stringify({
                name: location.display_name,
                lat: parseFloat(location.lat),
                lon: parseFloat(location.lon)
            })}'>
                <strong>${location.display_name.split(',')[0]}</strong>
                <br><small>${location.display_name}</small>
            </div>
        `).join('');
        
        document.querySelectorAll('.location-item').forEach(item => {
            item.addEventListener('click', () => selectLocation(item));
        });
    } catch (error) {
        resultsDiv.innerHTML = '<div class="error">Error searching locations</div>';
    }
}

function selectLocation(item) {
    selectedLocationData = JSON.parse(item.dataset.location);
    document.getElementById('selectedLocation').innerHTML = `
        <div class="selected-info">
            <strong>📍 Selected:</strong> ${selectedLocationData.name}<br>
            <small>Lat: ${selectedLocationData.lat.toFixed(4)}, Lon: ${selectedLocationData.lon.toFixed(4)}</small>
        </div>
    `;
    document.getElementById('locationResults').innerHTML = '';
    document.getElementById('location').value = selectedLocationData.name.split(',')[0];
}

// Blurbs UI
function loadBlurbList() {
    // Filter out deleted blurbs
    const activeDefaultBlurbs = DEFAULT_BLURBS.filter(b => !deletedDefaultBlurbIds.includes(b.id));
    const activeCustomBlurbs = customBlurbs.filter(b => !deletedBlurbs.find(d => d.id === b.id));
    const allBlurbs = [...activeDefaultBlurbs, ...activeCustomBlurbs];
    const container = document.getElementById('blurbTemplates');
    
    container.innerHTML = allBlurbs.map((blurb, index) => {
        const isCustom = blurb.createdAt !== undefined;
        const displayText = blurb.text.length > 360 ? blurb.text.substring(0, 360) + '...' : blurb.text;
        const filterState = templateFilters[blurb.id] || null;
        
        let filterClass = 'blurb-template-clickable';
        let filterLabel = '';
        
        if (filterState === 'exclude') {
            filterClass += ' filter-exclude';
            filterLabel = '<span class="filter-indicator">🚫 Hidden</span>';
        } else if (filterState === 'include') {
            filterClass += ' filter-include';
            filterLabel = '<span class="filter-indicator">✓ Only</span>';
        }
        
        return `
            <div class="${filterClass}" data-blurb-id="${blurb.id}" data-blurb-index="${index}">
                <p class="blurb-text">${displayText}${filterLabel}</p>
                <div class="blurb-meta">
                    <span class="blurb-author">by ${blurb.author}</span>
                    <button class="btn-delete" data-blurb-id="${blurb.id}" data-is-custom="${isCustom}">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click listeners for template filtering
    document.querySelectorAll('.blurb-template-clickable').forEach((el) => {
        const blurbId = parseInt(el.dataset.blurbId);
        el.addEventListener('click', (e) => {
            // Don't toggle filter if clicking delete button
            if (!e.target.classList.contains('btn-delete')) {
                toggleTemplateFilter(blurbId);
            }
        });
    });
    
    // Add delete button listeners
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const blurbId = parseInt(btn.dataset.blurbId);
            const isCustom = btn.dataset.isCustom === 'true';
            deleteBlurb(blurbId, isCustom);
        });
    });
}

// Toggle template filter: null -> exclude -> include -> null
function toggleTemplateFilter(templateId) {
    const currentState = templateFilters[templateId] || null;
    
    if (currentState === null) {
        templateFilters[templateId] = 'exclude';
    } else if (currentState === 'exclude') {
        templateFilters[templateId] = 'include';
    } else {
        templateFilters[templateId] = null;
    }
    
    loadBlurbList(); // Refresh template display
    refreshGeneratedBlurbs(); // Refresh filtered blurbs
}

function copyBlurb(btn) {
    const text = btn.parentElement.querySelector('.blurb-result').textContent;
    navigator.clipboard.writeText(text);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
}

// Delete & Bin functionality
function deleteBlurb(blurbId, isCustom) {
    if (confirm('Move this blurb to the bin?')) {
        if (isCustom) {
            const blurb = customBlurbs.find(b => b.id === blurbId);
            if (blurb) {
                deletedBlurbs.push(blurb);
                customBlurbs = customBlurbs.filter(b => b.id !== blurbId);
                localStorage.setItem('custom_blurbs', JSON.stringify(customBlurbs));
                localStorage.setItem('deleted_blurbs', JSON.stringify(deletedBlurbs));
            }
        } else {
            // Default blurb - just track its ID
            if (!deletedDefaultBlurbIds.includes(blurbId)) {
                deletedDefaultBlurbIds.push(blurbId);
                localStorage.setItem('deleted_default_blurb_ids', JSON.stringify(deletedDefaultBlurbIds));
            }
        }
        
        // Remove all generated blurbs for this template
        generatedBlurbs = generatedBlurbs.filter(gb => gb.blurbTemplate?.id !== blurbId);
        localStorage.setItem('generated_blurbs', JSON.stringify(generatedBlurbs));
        
        loadBlurbList();
        refreshGeneratedBlurbs();
    }
}

function showBin() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'binModal';
    
    const deletedDefaults = DEFAULT_BLURBS.filter(b => deletedDefaultBlurbIds.includes(b.id));
    const allDeleted = [...deletedDefaults, ...deletedBlurbs];
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🗑️ Deleted Blurbs</h3>
                <button class="close-modal" onclick="closeBin()">×</button>
            </div>
            <div class="modal-body">
                ${allDeleted.length === 0 ? '<p class="empty-message">Bin is empty</p>' : ''}
                ${allDeleted.map(blurb => {
                    const isCustom = blurb.createdAt !== undefined;
                    return `
                        <div class="bin-item">
                            <p class="blurb-text">${blurb.text}</p>
                            <div class="bin-actions">
                                <small>by ${blurb.author}</small>
                                <button class="btn-small" onclick="restoreBlurb(${blurb.id}, ${isCustom})">Restore</button>
                                <button class="btn-small btn-danger" onclick="permanentlyDeleteBlurb(${blurb.id}, ${isCustom})">Permanent Delete</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeBin() {
    const modal = document.getElementById('binModal');
    if (modal) modal.remove();
}

function restoreBlurb(blurbId, isCustom) {
    if (isCustom) {
        const blurb = deletedBlurbs.find(b => b.id === blurbId);
        if (blurb) {
            customBlurbs.push(blurb);
            deletedBlurbs = deletedBlurbs.filter(b => b.id !== blurbId);
            localStorage.setItem('custom_blurbs', JSON.stringify(customBlurbs));
            localStorage.setItem('deleted_blurbs', JSON.stringify(deletedBlurbs));
        }
    } else {
        deletedDefaultBlurbIds = deletedDefaultBlurbIds.filter(id => id !== blurbId);
        localStorage.setItem('deleted_default_blurb_ids', JSON.stringify(deletedDefaultBlurbIds));
    }
    loadBlurbList();
    closeBin();
    showBin(); // Refresh bin view
}

function permanentlyDeleteBlurb(blurbId, isCustom) {
    if (confirm('Permanently delete this blurb? This cannot be undone.')) {
        if (isCustom) {
            deletedBlurbs = deletedBlurbs.filter(b => b.id !== blurbId);
            localStorage.setItem('deleted_blurbs', JSON.stringify(deletedBlurbs));
        } else {
            // For default blurbs, keeping them in the deleted list is the "permanent" delete
            // since we can't actually delete them from DEFAULT_BLURBS constant
        }
        closeBin();
        showBin(); // Refresh bin view
    }
}

// Profile filtering
function refreshGeneratedBlurbs() {
    const container = document.getElementById('generatedBlurbs');
    const blurbsList = document.getElementById('blurbsList');
    if (!container || !blurbsList) return;
    
    // Apply profile filters first
    let filteredBlurbs = generatedBlurbs;
    const activeProfileFilters = Object.entries(profileFilters).filter(([_, state]) => state !== null);
    
    if (activeProfileFilters.length > 0) {
        filteredBlurbs = filteredBlurbs.filter(blurb => {
            const filterState = profileFilters[blurb.profileName];
            if (filterState === 'include') return true;
            if (filterState === 'exclude') return false;
            // null or undefined - show if no other profile is set to 'include'
            const hasIncludeFilter = Object.values(profileFilters).some(s => s === 'include');
            return !hasIncludeFilter;
        });
    }
    
    // Apply template filters
    const activeTemplateFilters = Object.entries(templateFilters).filter(([_, state]) => state !== null);
    
    if (activeTemplateFilters.length > 0) {
        filteredBlurbs = filteredBlurbs.filter(blurb => {
            const templateId = blurb.blurbTemplate?.id;
            const filterState = templateFilters[templateId];
            if (filterState === 'include') return true;
            if (filterState === 'exclude') return false;
            // null or undefined - show if no other template is set to 'include'
            const hasIncludeFilter = Object.values(templateFilters).some(s => s === 'include');
            return !hasIncludeFilter;
        });
    }
    
    blurbsList.innerHTML = filteredBlurbs.map(blurbData => `
        <div class="generated-blurb" data-blurb-id="${blurbData.id}">
            <div class="blurb-header">
                <span class="profile-label">${blurbData.profileName}</span>
                <button class="btn-edit" data-blurb-id="${blurbData.id}">Edit</button>
            </div>
            <p class="blurb-result">${blurbData.text}</p>
            <p class="blurb-original"><small>From: ${blurbData.original}</small></p>
            <button class="btn-copy" data-blurb-id="${blurbData.id}">Copy</button>
        </div>
    `).join('');
    
    // Show message if all blurbs are filtered out
    if (generatedBlurbs.length > 0 && filteredBlurbs.length === 0) {
        blurbsList.innerHTML = '<p class="filter-message">All blurbs are filtered out. Adjust filters to see blurbs.</p>';
    }
    
    // Add event listeners for edit and copy buttons
    blurbsList.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            openEditModal(parseInt(btn.dataset.blurbId));
        });
    });
    
    blurbsList.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            copyBlurbText(parseInt(btn.dataset.blurbId), e.target);
        });
    });
    
    // Show/hide the container based on whether we're in a blurbs section or have blurbs
    const blurbsSection = document.getElementById('blurbsSection');
    const shouldShow = (blurbsSection && blurbsSection.style.display === 'block') || generatedBlurbs.length > 0;
    
    container.style.display = (shouldShow && generatedBlurbs.length > 0) ? 'block' : 'none';
    
    // Update filter buttons
    updateFilterButtons();
}

function updateFilterButtons() {
    const container = document.getElementById('profileFilters');
    if (!container) return;
    
    const uniqueProfiles = [...new Set(generatedBlurbs.map(b => b.profileName))].sort();
    
    // Only hide if there are no generated blurbs at all
    if (uniqueProfiles.length === 0) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }
    
    // Show filters even with just 1 profile (useful to see what profile generated the blurbs)
    container.style.display = 'flex';
    container.innerHTML = uniqueProfiles.map(profileName => {
        const state = profileFilters[profileName] || null;
        let className = 'filter-btn';
        let label = profileName;
        
        if (state === 'exclude') {
            className += ' filter-exclude';
            label = '🚫 ' + profileName;
        } else if (state === 'include') {
            className += ' filter-include';
            label = '✓ ' + profileName;
        }
        
        return `<button class="${className}" data-profile-name="${profileName}">${label}</button>`;
    }).join('');
    
    // Add event listeners to filter buttons
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleProfileFilter(btn.dataset.profileName);
        });
    });
}

function toggleProfileFilter(profileName) {
    const currentState = profileFilters[profileName] || null;
    
    // Cycle: null -> exclude -> include -> null
    if (currentState === null) {
        profileFilters[profileName] = 'exclude';
    } else if (currentState === 'exclude') {
        profileFilters[profileName] = 'include';
    } else {
        profileFilters[profileName] = null;
    }
    
    refreshGeneratedBlurbs();
}

function copyBlurbText(blurbId, button) {
    const blurb = generatedBlurbs.find(b => b.id === blurbId);
    if (blurb) {
        navigator.clipboard.writeText(blurb.text);
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
    }
}

// Edit modal functionality
function openEditModal(blurbId) {
    const blurbData = generatedBlurbs.find(b => b.id === blurbId);
    if (!blurbData) return;
    
    modalCounter++;
    const modalId = `editModal_${modalCounter}`;
    const offset = (modalCounter - 1) * 30;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = modalId;
    modal.style.zIndex = 1000 + modalCounter;
    
    const blurbTemplate = blurbData.blurbTemplate;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Blurb</h3>
                <button class="close-modal" onclick="closeEditModal('${modalId}')">×</button>
            </div>
            <div class="modal-body">
                <form id="editForm_${modalCounter}" onsubmit="event.preventDefault(); saveEditedBlurb('${modalId}', ${modalCounter})">
                    <div class="form-group">
                        <label>Blurb Template:</label>
                        <textarea id="editText_${modalCounter}" rows="4" required>${blurbTemplate.text}</textarea>
                    </div>
                    <div id="editReplacements_${modalCounter}">
                        ${generateReplacementFields(blurbTemplate, modalCounter)}
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-submit">Save as New</button>
                        <button type="button" class="btn btn-secondary" onclick="closeEditModal('${modalId}')">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add listener to close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditModal(modalId);
        }
    });
}

function generateReplacementFields(blurbTemplate, counter) {
    if (!blurbTemplate.replacements || !blurbTemplate.text) return '';
    
    // Extract @variables from text in order
    const matches = blurbTemplate.text.match(/@\w+/g) || [];
    
    // Build lookup for replacement values
    const replacementLookup = {};
    Object.entries(blurbTemplate.replacements).forEach(([varName, values]) => {
        const isMultiple = Array.isArray(values[0]);
        replacementLookup[varName] = {
            values: isMultiple ? values : [values],
            currentIndex: 0
        };
    });
    
    // Generate fields in text order
    return matches.map((match, idx) => {
        const varName = match.substring(1);
        const isOrdinalHouse = varName.match(/[A-Za-z]+(H|house)th$/);
        
        // Get the appropriate values for this occurrence
        const lookup = replacementLookup[varName];
        if (!lookup) return '';
        
        const valArray = lookup.values[lookup.currentIndex] || lookup.values[0];
        lookup.currentIndex++;
        
        const joinedValues = Array.isArray(valArray) ? valArray.join(', ') : valArray;
        
        return `
        <div class="replacement-group">
            <label>@${varName}:</label>
            <textarea 
                id="editReplace_${counter}_${idx}" 
                rows="2" 
                ${isOrdinalHouse ? 'readonly style="background-color: #f0f0f0; cursor: not-allowed;"' : 'required'}
            >${joinedValues}</textarea>
        </div>
        `;
    }).join('');
}

function closeEditModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

function saveEditedBlurb(modalId, formCounter) {
    const text = document.getElementById(`editText_${formCounter}`).value;
    const replacements = {};
    
    // Extract all @variables in order
    const matches = text.match(/@\w+/g) || [];
    
    // Build replacements object with each @variable as a key, storing arrays of values
    for (let idx = 0; idx < matches.length; idx++) {
        const match = matches[idx];
        const varName = match.substring(1);
        const input = document.getElementById(`editReplace_${formCounter}_${idx}`);
        
        if (input) {
            const values = input.value.split(',').map(v => v.trim());
            const isLifePath = varName === 'LP' || varName === 'lifepath';
            const isOrdinalHouse = varName.match(/[A-Za-z]+(H|house)th$/);
            
            // Skip validation for ordinal house placeholders (they're fixed)
            if (!isOrdinalHouse) {
                if (isLifePath && (values.length < 9 || values.length > 12)) {
                    alert(`@${varName} needs 9-12 comma-separated values (1-9, optionally 11, 22, 33)`);
                    return;
                } else if (!isLifePath && values.length !== 12) {
                    alert(`@${varName} needs exactly 12 comma-separated values`);
                    return;
                }
            }
            
            // Store each occurrence's values - if varName already exists, store as array
            if (!replacements[varName]) {
                replacements[varName] = values;
            } else {
                // Convert to array of arrays if not already
                if (!Array.isArray(replacements[varName][0])) {
                    replacements[varName] = [replacements[varName]];
                }
                replacements[varName].push(values);
            }
        }
    }
    
    const newBlurb = {
        id: Date.now(),
        text: text,
        author: 'You (edited)',
        replacements: replacements,
        createdAt: new Date().toISOString()
    };
    
    customBlurbs.push(newBlurb);
    localStorage.setItem('custom_blurbs', JSON.stringify(customBlurbs));
    
    loadBlurbList();
    closeEditModal(modalId);
    
    // Auto-generate blurbs for all profiles with this edited template
    document.getElementById('loading').style.display = 'block';
    generateBlurbsForNewTemplate(newBlurb).then(() => {
        refreshGeneratedBlurbs();
        document.getElementById('loading').style.display = 'none';
        alert('Blurb saved and generated for all profiles!');
    }).catch(error => {
        console.error('Error generating blurbs for edited template:', error);
        document.getElementById('loading').style.display = 'none';
        alert('Blurb saved, but there was an error generating variations.');
    });
}

// Custom blurbs
function showBlurbForm() {
    modalCounter++;
    const modalId = `createModal_${modalCounter}`;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = modalId;
    modal.style.zIndex = 1000 + modalCounter;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Custom Blurb</h3>
                <button class="close-modal" onclick="closeCreateModal('${modalId}')">×</button>
            </div>
            <div class="modal-body">
                <form id="createForm_${modalCounter}" onsubmit="event.preventDefault(); handleCreateBlurbSubmit('${modalId}', ${modalCounter})">
                    <div class="form-group">
                        <label for="createBlurbText_${modalCounter}">Blurb Template:</label>
                        <textarea id="createBlurbText_${modalCounter}" rows="4" placeholder="Use @sun, @moon, @rising, @venus, @mars, @mercury, @jupiter, @saturn, @mc, @sunH, @moonhouse, etc." required></textarea>
                        <small>Signs: @sun, @moon, @mercury, @venus, @mars, @jupiter, @saturn, @uranus, @neptune, @pluto, @chiron, @ceres, @pallas, @juno, @vesta, @lilith, @pholus, @eris, @northnode (@NN), @rising (@ascendant), @mc</small><br>
                        <small>Houses: @sunhouse (@sunH), @moonhouse (@moonH), @plutoH, @northnodeH, etc.</small><br>
                        <small>Numerology: @LP (@lifepath) - Life Path number 1-9, 11, 22, 33 (11, 22 & 33 are optional)</small>
                    </div>
                    <div id="createReplacements_${modalCounter}"></div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-submit">Save Blurb</button>
                        <button type="button" class="btn btn-secondary" onclick="closeCreateModal('${modalId}')">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add input listener for dynamic replacement fields
    const textarea = document.getElementById(`createBlurbText_${modalCounter}`);
    textarea.addEventListener('input', () => updateCreateReplacementFields(modalCounter));
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCreateModal(modalId);
        }
    });
}

function closeCreateModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

function updateCreateReplacementFields(counter) {
    const text = document.getElementById(`createBlurbText_${counter}`).value;
    const replacementsContainer = document.getElementById(`createReplacements_${counter}`);
    
    // Extract all @variable placeholders in order, keeping duplicates
    const matches = text.match(/@\w+/g) || [];
    
    // Generate input fields for each occurrence in order
    replacementsContainer.innerHTML = matches.map((match, idx) => {
        const varName = match.substring(1);
        const isLifePath = varName === 'LP' || varName === 'lifepath';
        // Check if it's an ordinal house placeholder (ends with "Hth" or "houseth")
        const isOrdinalHouse = varName.match(/[A-Za-z]+(H|house)th$/);
        const isHouse = !isOrdinalHouse && varName.match(/[A-Za-z]+(H|house)$/);
        
        let hint = 'Aries-Pisces';
        let defaultValues = 'Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces';
        let isReadonly = false;
        
        if (isOrdinalHouse) {
            hint = 'Ordinal houses (fixed)';
            defaultValues = '1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th';
            isReadonly = true;
        } else if (isLifePath) {
            hint = 'Life Path 1-9, optionally 11, 22, 33';
            defaultValues = '1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33';
        } else if (isHouse) {
            hint = 'Houses 1-12';
            defaultValues = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12';
        }
        
        return `
        <div class="replacement-group">
            <label for="createReplace_${counter}_${idx}">
                <strong>${match}</strong> replacements
                <small>(${isOrdinalHouse ? 'Fixed ordinal values' : (isLifePath ? '9-12' : '12')} ${isOrdinalHouse ? '' : 'comma-separated values for '}${hint})</small>
            </label>
            <textarea 
                id="createReplace_${counter}_${idx}" 
                rows="2" 
                placeholder="${defaultValues}"
                ${isReadonly ? 'readonly style="background-color: #f0f0f0; cursor: not-allowed;"' : 'required'}
            >${defaultValues}</textarea>
        </div>
        `;
    }).join('');
}

function handleCreateBlurbSubmit(modalId, formCounter) {
    const text = document.getElementById(`createBlurbText_${formCounter}`).value;
    const replacements = {};
    
    // Extract all @variables in order
    const matches = text.match(/@\w+/g) || [];
    
    // Build replacements object with each @variable as a key, storing arrays of values
    for (let idx = 0; idx < matches.length; idx++) {
        const match = matches[idx];
        const varName = match.substring(1);
        const input = document.getElementById(`createReplace_${formCounter}_${idx}`);
        
        if (input) {
            const values = input.value.split(',').map(v => v.trim());
            const isLifePath = varName === 'LP' || varName === 'lifepath';
            const isOrdinalHouse = varName.match(/[A-Za-z]+(H|house)th$/);
            
            // Skip validation for ordinal house placeholders (they're fixed)
            if (!isOrdinalHouse) {
                if (isLifePath && (values.length < 9 || values.length > 12)) {
                    alert(`@${varName} needs 9-12 comma-separated values (1-9, optionally 11, 22, 33)`);
                    return;
                } else if (!isLifePath && values.length !== 12) {
                    alert(`@${varName} needs exactly 12 comma-separated values`);
                    return;
                }
            }
            
            // Store each occurrence's values - if varName already exists, store as array
            if (!replacements[varName]) {
                replacements[varName] = values;
            } else {
                // Convert to array of arrays if not already
                if (!Array.isArray(replacements[varName][0])) {
                    replacements[varName] = [replacements[varName]];
                }
                replacements[varName].push(values);
            }
        }
    }
    
    const newBlurb = {
        id: Date.now(),
        text: text,
        author: 'You',
        replacements: replacements,
        createdAt: new Date().toISOString()
    };
    
    customBlurbs.push(newBlurb);
    localStorage.setItem('custom_blurbs', JSON.stringify(customBlurbs));
    
    loadBlurbList();
    closeCreateModal(modalId);
    
    // Auto-generate blurbs for all profiles with this new template
    document.getElementById('loading').style.display = 'block';
    generateBlurbsForNewTemplate(newBlurb).then(() => {
        refreshGeneratedBlurbs();
        document.getElementById('loading').style.display = 'none';
    }).catch(error => {
        console.error('Error generating blurbs for new template:', error);
        document.getElementById('loading').style.display = 'none';
    });
}

// Chart View Functions
async function viewChart(id) {
    const profile = profileManager.getProfile(id);
    if (!profile) return;
    
    document.getElementById('loading').style.display = 'block';
    
    try {
        const response = await fetch('/api/chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                datetime: profile.datetime,
                latitude: profile.latitude,
                longitude: profile.longitude,
                timezone: profile.timezone,
                location: profile.location
            })
        });
        
        if (!response.ok) throw new Error('Chart calculation failed');
        
        currentChart = await response.json();
        currentChart.profileName = profile.name;
        currentChart.profileId = profile.id;
        
        // Show chart section, hide blurbs section
        document.getElementById('blurbsSection').style.display = 'none';
        document.getElementById('chartSection').style.display = 'block';
        currentView = 'chart';
        
        // Update chart display
        displayChart(currentChart);
        updateChartProfileSelector(profile.id);
        
        document.getElementById('chartSection').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        alert('Error calculating chart: ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function convertChartDataForAstroChart(chart) {
    // Convert our chart data format to AstroChart library format
    const astroData = {
        planets: {},
        cusps: []
    };
    
    // Map planet names to AstroChart format and extract longitudes
    const planetMapping = {
        'SUN': 'Sun',
        'MOON': 'Moon',
        'MERCURY': 'Mercury',
        'VENUS': 'Venus',
        'MARS': 'Mars',
        'JUPITER': 'Jupiter',
        'SATURN': 'Saturn',
        'URANUS': 'Uranus',
        'NEPTUNE': 'Neptune',
        'PLUTO': 'Pluto',
        'N. NODE': 'NNode'
    };
    
    // Add planets
    for (const [ourName, astroName] of Object.entries(planetMapping)) {
        if (chart.planets?.[ourName]?.longitude !== undefined) {
            astroData.planets[astroName] = [chart.planets[ourName].longitude];
        }
    }
    
    // Add house cusps
    if (chart.houses?.cusps) {
        astroData.cusps = chart.houses.cusps.map(cusp => cusp.longitude);
    }
    
    return astroData;
}

function displayChart(chart) {
    const chartDisplay = document.getElementById('chartDisplay');
    document.getElementById('chartProfileName').textContent = chart.profileName;
    
    // Render birth chart wheel using AstroChart library
    const chartWheel = document.getElementById('chartWheel');
    chartWheel.innerHTML = ''; // Clear previous chart
    
    try {
        const astroData = convertChartDataForAstroChart(chart);
        console.log('AstroChart data:', astroData); // Debug
        console.log('Astrochart object:', typeof astrochart, window.astrochart); // Debug
        
        // Configure aspects to show
        const settings = {
            ASPECTS: {
                conjunction: { enabled: true, angle: 0, orb: 8 },
                opposition: { enabled: true, angle: 180, orb: 8 },
                trine: { enabled: true, angle: 120, orb: 8 },
                square: { enabled: true, angle: 90, orb: 8 },
                sextile: { enabled: true, angle: 60, orb: 6 },
                quincunx: { enabled: true, angle: 150, orb: 3 }
            }
        };
        
        const astroChart = new astrochart.Chart('chartWheel', 600, 600, settings);
        astroChart.radix(astroData);
    } catch (error) {
        console.error('Error rendering chart wheel:', error);
        chartWheel.innerHTML = '<p style="text-align: center; color: #666;">Chart wheel unavailable: ' + error.message + '</p>';
    }
    
    const planets = [
        { name: 'Sun', key: 'SUN' },
        { name: 'Moon', key: 'MOON' },
        { name: 'Mercury', key: 'MERCURY' },
        { name: 'Venus', key: 'VENUS' },
        { name: 'Mars', key: 'MARS' },
        { name: 'Jupiter', key: 'JUPITER' },
        { name: 'Saturn', key: 'SATURN' },
        { name: 'Uranus', key: 'URANUS' },
        { name: 'Neptune', key: 'NEPTUNE' },
        { name: 'Pluto', key: 'PLUTO' },
        { name: 'Chiron', key: 'CHIRON' },
        { name: 'Ceres', key: 'CERES' },
        { name: 'Pallas', key: 'PALLAS' },
        { name: 'Juno', key: 'JUNO' },
        { name: 'Vesta', key: 'VESTA' },
        { name: 'Lilith', key: 'LILITH' },
        { name: 'Pholus', key: 'PHOLUS' },
        { name: 'Eris', key: 'ERIS' },
        { name: 'North Node', key: 'N. NODE' }
    ];
    
    let html = '<table class="chart-table"><thead><tr><th>Planet</th><th>Sign</th><th>House</th></tr></thead><tbody>';
    
    planets.forEach(planet => {
        const data = chart.planets?.[planet.key];
        if (data) {
            const sign = data.zodiac?.sign || '—';
            const house = data.house || '—';
            html += `<tr><td>${planet.name}</td><td>${sign}</td><td>${house}</td></tr>`;
        }
    });
    
    // Add Ascendant and MC
    const ascendant = chart.houses?.angles?.ascendant?.zodiac?.sign || '—';
    const mc = chart.houses?.angles?.mc?.zodiac?.sign || '—';
    html += `<tr><td><strong>Ascendant</strong></td><td>${ascendant}</td><td>—</td></tr>`;
    html += `<tr><td><strong>MC (Midheaven)</strong></td><td>${mc}</td><td>—</td></tr>`;
    
    // Add Life Path if available
    if (chart.lifePath) {
        html += `<tr><td><strong>Life Path</strong></td><td colspan="2">${chart.lifePath}</td></tr>`;
    }
    
    html += '</tbody></table>';
    
    chartDisplay.innerHTML = html;
}

function updateChartProfileSelector(currentProfileId) {
    const selector = document.getElementById('chartProfileSelector');
    const profiles = profileManager.profiles;
    
    selector.innerHTML = profiles.map(profile => `
        <option value="${profile.id}" ${profile.id === currentProfileId ? 'selected' : ''}>
            ${profile.name}
        </option>
    `).join('');
    
    // Add change listener
    selector.onchange = (e) => {
        viewChart(e.target.value);
    };
}

function backToBlurbs() {
    document.getElementById('chartSection').style.display = 'none';
    document.getElementById('blurbsSection').style.display = 'block';
    currentView = 'blurbs';
    document.getElementById('blurbsSection').scrollIntoView({ behavior: 'smooth' });
}


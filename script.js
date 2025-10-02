// --- 1. DATA and GLOBAL VARIABLES ---

// The single, global Audio object for playback
let currentAudio = new Audio();

// This array will hold the songs of the CURRENTLY SELECTED playlist
let songs = [];
let currentSongIndex = 0;

// This is our new "database" of playlists.
// It replaces the need for the old getSongs() function.
const playlists = [
    {
        name: "Punjabi Pump",
        description: "High-energy tracks to get you going.",
        cover: "https://i.scdn.co/image/ab67706f00000002d5d2003959d642758be307d6",
        songs: [
            { title: "Brown Munde", file: "Brown Munde-(Mr-Jat.in).mp3" },
            { title: "Watch Out", file: "Watch_Out_1.mp3" },
            { title: "Racks On Racks", file: "Racks_On_Racks_1.mp3" }
        ]
    },
    {
        name: "Rapid 91 Punjabi",
        description: "A mix of fresh hits and vibes.",
        cover: "https://i.scdn.co/image/ab67706f000000025ecf3107b2db0060544b1cf4",
        songs: [
            { title: "My Prime", file: "songs/My_Prime.mp3" },
            
            { title: "7.7 Magnitude", file: "songs/7.7 Magnitude - Karan Aujla (Mr-Punjab.Com).mp3" }
        ]
    },
    {
        name: "Hot Hits Punjabi",
        description: "The biggest and most popular tracks.",
        cover: "https://i.scdn.co/image/ab67706f00000002bf7a3468e2d7c22cd2c6b713",
        songs: [
            { title: "Lover", file: "songs/Lover - Diljit Dosanjh (Mr-Punjab.Com).mp3" },
            { title: "No Love", file: "songs/No Love - Shubh (Mr-Punjab.Com).mp3" },
            { title: "For A Reason", file: "songs/For A Reason - Karan Aujla (Mr-Punjab.Com).mp3" },
            { title: "0008", file: "songs/0008_1.mp3" }
        ]
    },
    {
        name: "Soft Punjabi Music",
        description: "Relax and unwind with these melodies.",
        cover: "https://mosaic.scdn.co/300/ab67616d00001e0223e38e647970109a73eec1f4ab67616d00001e029e53b8179f96628d184aa70eab67616d00001e02aecb98c5f918229aba7d6c7aab67616d00001e02b2d7acda99464fbc9775f89d",
        songs: [
            { title: "Lover", file: "songs/Lover - Diljit Dosanjh (Mr-Punjab.Com).mp3" },
            { title: "Regret", file: "songs/Regret_1.mp3" },
            { title: "No Love", file: "songs/No Love - Shubh (Mr-Punjab.Com).mp3" }
        ]
    },
    {
        name: "Desi Hits",
        description: "All-time favorite desi tracks.",
        cover: "https://i.scdn.co/image/ab67706f0000000245118c6c5bccca99c3a39fa5",
        songs: [
            { title: "Brown Munde", file: "songs/Brown Munde-(Mr-Jat.in).mp3" },
            { title: "Lover", file: "songs/Lover - Diljit Dosanjh (Mr-Punjab.Com).mp3" },
            { title: "Balenci", file: "songs/Balenci - Shubh (Mr-Punjab.Com).mp3" }
        ]
    },
    {
        name: "Workout",
        description: "Music to power your workout.",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84db81170d809c609aaca74c95",
        songs: [
            { title: "Mf Gabhru", file: "songs/Mf Gabhru - Karan Aujla (Mr-Punjab.Com).mp3" },
            { title: "Sit Down Son", file: "songs/Sit_Down_Son_1.mp3" },
            { title: "Jadd V Julm", file: "songs/Jadd V Julm.mp3" }
        ]
    },
    {
        name: "Punjabi Hits",
        description: "A collection of chart-topping hits.",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842fea502fc4b5c1343e8e5dd4",
        songs: [
            { title: "P-Pop Culture", file: "songs/P-Pop Culture - Karan Aujla (Mr-Punjab.Com).mp3" },
            { title: "Lock", file: "songs/Lock_1.mp3" },
            { title: "Take Notes", file: "songs/Take_Notes_1.mp3" },
            { title: "Neal", file: "songs/Neal_1.mp3" }
        ]
    },
    {
        name: "Trending Now Punjabi",
        description: "What's hot in the Punjabi scene right now.",
        cover: "https://i.scdn.co/image/ab67706f00000002009dcc30f0ce309276258332",
        songs: [
            { title: "0008", file: "songs/0008_1.mp3" },
            { title: "No Love", file: "songs/No Love - Shubh (Mr-Punjab.Com).mp3" },
            { title: "For A Reason", file: "songs/For A Reason - Karan Aujla (Mr-Punjab.Com).mp3" },
            { title: "Balenci", file: "songs/Balenci - Shubh (Mr-Punjab.Com).mp3" }
        ]
    },
    {
        name: "Pump Action",
        description: "Hard-hitting tracks for maximum energy.",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72caaf2ef8ee1a2de8f903abe6d",
        songs: [
            { title: "Watch Out", file: "songs/Watch_Out_1.mp3" },
            { title: "Jadd V Julm", file: "songs/Jadd V Julm.mp3" },
            { title: "Neal", file: "songs/Neal_1.mp3" }
        ]
    }
];

// --- 2. CORE FUNCTIONS ---

/**
 * Plays a track and updates the UI.
 * @param {string} trackPath The relative path of the song to play (e.g., "songs/0008_1.mp3").
 * @param {string} trackTitle The title of the song to display.
 */
const playMusic = (trackPath, trackTitle) => {
    currentAudio.src = trackPath;
    currentAudio.play().catch(e => console.error("Playback error:", e));
    
    // Update the play button icon to "pause"
    document.getElementById("play").src = "pause.svg";

    // Update the song info display in the playbar
    document.querySelector(".songinfo").innerHTML = trackTitle;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    // Update the global index
    currentSongIndex = songs.findIndex(song => song.file === trackPath);
};

/**
 * Attaches click event listeners to the songs currently listed in the library.
 * This needs to be called every time we display new songs.
 */
function attachSongClickListeners() {
    const songListItems = document.querySelectorAll(".songlist ul li");
    songListItems.forEach(li => {
        li.addEventListener("click", () => {
            const trackPath = li.dataset.src;
            const trackTitle = li.dataset.title;
            playMusic(trackPath, trackTitle);
        });
    });
}

/**
 * Displays songs from a selected playlist in the "Your Library" section.
 * @param {object} playlist The playlist object containing the songs to display.
 */
function displaySongsForPlaylist(playlist) {
    const songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = ""; // Clear the current song list

    // Update the global 'songs' array to the songs from the chosen playlist
    songs = playlist.songs;

    // Populate the library with the new songs
    for (const song of songs) {
        songUL.innerHTML += `
            <li data-src="${song.file}" data-title="${song.title}">
                <img class="invert" src="music.svg" alt="Music icon">
                <div class="info">
                    <div>${song.title}</div>
                    <div>Song</div>
                </div>
            </li>`;
    }

    // IMPORTANT: Re-attach event listeners to the new list items
    attachSongClickListeners();
}

/**
 * Creates and displays the playlist cards in the main content area.
 */
function displayPlaylists() {
    const cardContainer = document.querySelector(".cardcontainer");
    cardContainer.innerHTML = ""; // Clear any existing cards

    playlists.forEach(playlist => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
                    <circle cx="25" cy="25" r="25" fill="#1DB954" />
                    <g transform="translate(13,13) scale(1.0)">
                        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="black" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                    </g>
                </svg>
            </div>
            <img src="${playlist.cover}" alt="${playlist.name}">
            <h2>${playlist.name}</h2>
            <p>${playlist.description}</p>`;
        
        // Add click listener to the card to show its songs
        card.addEventListener("click", () => {
            displaySongsForPlaylist(playlist);
        });

        cardContainer.appendChild(card);
    });
}


// --- 3. MAIN EXECUTION and EVENT LISTENERS ---

function main() {
    // Initially display all the playlist cards
    displayPlaylists();

    // --- Player Control Event Listeners (Setup once) ---
    const playBtn = document.getElementById("play");
    const previousBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    const volumeBtn = document.getElementById("volumeBtn");

    playBtn.addEventListener("click", () => {
        if (!currentAudio.src) return; // Do nothing if no song is loaded
        if (currentAudio.paused) {
            currentAudio.play();
            playBtn.src = "pause.svg";
        } else {
            currentAudio.pause();
            playBtn.src = "play.svg";
        }
    });

    previousBtn.addEventListener("click", () => {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            const prevSong = songs[currentSongIndex];
            playMusic(prevSong.file, prevSong.title);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            const nextSong = songs[currentSongIndex];
            playMusic(nextSong.file, nextSong.title);
        }
    });
    
    currentAudio.addEventListener("ended", () => {
        // Auto-play the next song when one finishes
        nextBtn.click();
    });

    currentAudio.addEventListener("timeupdate", () => {
        let currentTime = currentAudio.currentTime;
        let duration = currentAudio.duration;
        if (!isNaN(duration)) {
            const formatTime = (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            };
            document.querySelector(".songtime").innerHTML = `${formatTime(currentTime)} / ${formatTime(duration)}`;
            document.querySelector(".circle").style.left = (currentTime / duration) * 100 + "%";
        }
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        if (currentAudio.duration) {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width);
            currentAudio.currentTime = percent * currentAudio.duration;
        }
    });

    // --- NEW CODE ---
volumeBtn.addEventListener("click", () => {
    // Toggle the audio's muted state
    currentAudio.muted = !currentAudio.muted;

    // Add or remove the 'muted' class on the button based on the state
    volumeBtn.classList.toggle("muted", currentAudio.muted);
});
    // Hamburger and Close button listeners
   document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-110%"; // match CSS
});

}

// Run the main function to start the application
main();

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const mainCard = document.getElementById('mainCard');
    const datePlanner = document.getElementById('datePlanner');
    const successScroll = document.getElementById('successScroll');
    const sealDealBtn = document.getElementById('sealDealBtn');
    const speechBubble = document.getElementById('speechBubble');
    
    // Avatar Elements
    const leftEye = document.getElementById('leftEye');
    const rightEye = document.getElementById('rightEye');
    const leftArm = document.getElementById('leftArm');
    const rightArm = document.getElementById('rightArm');
    const mouth = document.getElementById('mouth');
    const leftEyebrow = document.getElementById('leftEyebrow');
    const rightEyebrow = document.getElementById('rightEyebrow');
    const ninjaAvatar = document.getElementById('ninjaAvatar');

    // Interactive State
    let noHoverCount = 0;
    const noPhrases = [
        "Decline (No)",
        "Are you sure? 🥺",
        "Think again! 🥷",
        "Wrong button!",
        "Nice try, click Yes!",
        "Error 404: No not found"
    ];

    const avatarDialogues = [
        "Hey there, future ninja partner... 🥷💖",
        "My sensors detect you're hesitating! 👀",
        "The 'Yes' button is looking very shiny right now ✨",
        "Resistance is futile, agent! 😉",
        "Pretty please with boba on top? 🧋"
    ];

    // Mouse Tracking Eye Effect
    document.addEventListener('mousemove', (e) => {
        const rect = ninjaAvatar.getBoundingClientRect();
        const avatarX = rect.left + rect.width / 2;
        const avatarY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - avatarY, e.clientX - avatarX);
        const distance = Math.min(4, Math.hypot(e.clientX - avatarX, e.clientY - avatarY) / 30);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        const pupils = document.querySelectorAll('.pupil');
        pupils.forEach(p => {
            p.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });

    // Background Particle Generator
    const particlesContainer = document.getElementById('particlesContainer');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}%`;
        p.style.width = `${Math.random() * 6 + 4}px`;
        p.style.height = p.style.width;
        p.style.animationDuration = `${Math.random() * 6 + 6}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(p);
    }

    // Playful "No" Button Dodge & Reaction
    noBtn.addEventListener('mouseover', () => {
        noHoverCount++;
        
        // Cycle through funny button labels
        const phraseIndex = Math.min(noHoverCount, noPhrases.length - 1);
        noBtn.textContent = noPhrases[phraseIndex];

        // Random jump location within bounds
        const xOffset = (Math.random() - 0.5) * 160;
        const yOffset = (Math.random() - 0.5) * 80;
        noBtn.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

        // Make Avatar look pleading / worried
        speechBubble.textContent = avatarDialogues[noHoverCount % avatarDialogues.length];
        leftEyebrow.style.transform = 'rotate(15deg)';
        rightEyebrow.style.transform = 'rotate(-15deg)';
        mouth.style.borderRadius = '50%';
        mouth.style.height = '12px';
        mouth.style.width = '14px';
        leftArm.style.transform = 'rotate(-30deg)';
        rightArm.style.transform = 'rotate(30deg)';
    });

    noBtn.addEventListener('mouseleave', () => {
        // Reset facial expression slightly
        setTimeout(() => {
            leftEyebrow.style.transform = 'rotate(-5deg)';
            rightEyebrow.style.transform = 'rotate(5deg)';
            mouth.style.borderRadius = '0 0 10px 10px';
            mouth.style.height = '10px';
            mouth.style.width = '18px';
            leftArm.style.transform = 'rotate(15deg)';
            rightArm.style.transform = 'rotate(-15deg)';
        }, 300);
    });

    // "Yes" Button Click -> Transition to Date Planner
    yesBtn.addEventListener('click', () => {
        // Overjoyed Avatar Reaction
        speechBubble.textContent = "MISSION SUCCESS! Best day ever! 🎉✨";
        mouth.style.borderRadius = '0 0 15px 15px';
        mouth.style.height = '14px';
        mouth.style.width = '22px';
        leftArm.style.transform = 'rotate(-60deg)';
        rightArm.style.transform = 'rotate(60deg)';

        // Trigger celebratory confetti effect
        createConfetti();

        // Smooth card transition
        mainCard.style.opacity = '0';
        setTimeout(() => {
            mainCard.classList.add('hidden');
            datePlanner.classList.remove('hidden');
        }, 300);
    });

    // Chip Selection Logic
    setupChipGroup('activityChips');
    setupChipGroup('snackChips');

    function setupChipGroup(containerId) {
        const container = document.getElementById(containerId);
        const chips = container.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    }

    // Seal Deal & Show Final Summary Scroll
    sealDealBtn.addEventListener('click', () => {
        const selectedActivity = document.querySelector('#activityChips .chip.active').getAttribute('data-value');
        const selectedSnack = document.querySelector('#snackChips .chip.active').getAttribute('data-value');
        const dateTime = document.getElementById('dateTimeInput').value;

        const summaryBox = document.getElementById('missionSummary');
        summaryBox.innerHTML = `
            <strong>🎯 Operation:</strong> Ninja Date Night<br>
            <strong>🍜 Activity:</strong> ${selectedActivity}<br>
            <strong>🕒 Schedule:</strong> ${dateTime}<br>
            <strong>🎁 Perk / Snack:</strong> ${selectedSnack}<br>
            <strong>🔒 Status:</strong> Fully Confirmed & Locked In!
        `;

        datePlanner.style.opacity = '0';
        setTimeout(() => {
            datePlanner.classList.add('hidden');
            successScroll.classList.remove('hidden');
        }, 300);
    });

    // Copy Summary Button
    const copySummaryBtn = document.getElementById('copySummaryBtn');
    copySummaryBtn.addEventListener('click', () => {
        const summaryText = document.getElementById('missionSummary').innerText;
        navigator.clipboard.writeText(`🥷✨ MISSION CONFIRMED ✨🥷\n\n${summaryText}`).then(() => {
            copySummaryBtn.textContent = '✅ Copied to Clipboard!';
            setTimeout(() => {
                copySummaryBtn.textContent = '📋 Copy Mission Details';
            }, 2500);
        });
    });

    // Confetti Effect Helper
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `-10px`;
            confetti.style.width = `${Math.random() * 8 + 6}px`;
            confetti.style.height = `${Math.random() * 8 + 6}px`;
            confetti.style.backgroundColor = ['#ff3366', '#6366f1', '#10b981', '#fbbf24', '#38bdf8'][Math.floor(Math.random() * 5)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            const duration = Math.random() * 2 + 1.5;
            const xEnd = (Math.random() - 0.5) * 200;

            confetti.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
            
            setTimeout(() => {
                confetti.style.transform = `translate(${xEnd}px, 100vh) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
});

    // --- State Management ---
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);

    const state = {
      noHoverCount: 0,
      selectedActivity: 'Ramen & Boba Night 🍜',
      date: [
        defaultDate.getFullYear(),
        String(defaultDate.getMonth() + 1).padStart(2, '0'),
        String(defaultDate.getDate()).padStart(2, '0')
      ].join('-'),
      time: '18:30',
      snack: 'Taro Milk Tea with Boba 🧋'
    };

    // --- DOM Elements ---
    const avatarHead = document.getElementById('ninja-head');
    const eyeLeftPupil = document.getElementById('eye-left-pupil');
    const eyeRightPupil = document.getElementById('eye-right-pupil');
    const mouth = document.getElementById('ninja-mouth');
    const eyebrowLeft = document.getElementById('brow-left');
    const eyebrowRight = document.getElementById('brow-right');
    const blushLeft = document.getElementById('blush-left');
    const blushRight = document.getElementById('blush-right');
    const handLeft = document.getElementById('hand-left');
    const handRight = document.getElementById('hand-right');
    const speechBubble = document.getElementById('speech-bubble');

    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const boundary = document.getElementById('button-boundary');

    const stepProposal = document.getElementById('step-proposal');
    const stepPlanner = document.getElementById('step-planner');
    const stepSummary = document.getElementById('step-summary');

    // Default Date Setup
    document.getElementById('date-picker').value = state.date;

    // --- Ambient Particle Generator ---
    function initParticles() {
      const container = document.getElementById('particle-container');
      const symbols = ['🌸', '✨', '💖', '🥷', '🍃', '⭐'];

      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDuration = `${6 + Math.random() * 6}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        p.style.fontSize = `${14 + Math.random() * 12}px`;
        container.appendChild(p);
      }
    }
    initParticles();

    // --- Mouse Eye-Tracking & Head Movement ---
    document.addEventListener('mousemove', (e) => {
      const rect = avatarHead.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - headCenterX;
      const deltaY = e.clientY - headCenterY;

      // Limit pupil shift
      const moveX = Math.max(-4, Math.min(4, deltaX / 40));
      const moveY = Math.max(-3, Math.min(3, deltaY / 40));

      eyeLeftPupil.setAttribute('transform', `translate(${moveX}, ${moveY})`);
      eyeRightPupil.setAttribute('transform', `translate(${moveX}, ${moveY})`);

      // Gentle head tilt
      const tiltX = Math.max(-6, Math.min(6, deltaX / 60));
      const tiltY = Math.max(-4, Math.min(4, deltaY / 60));
      avatarHead.style.transform = `translate(${tiltX}px, ${tiltY}px)`;
    });

    // --- Avatar Expression Controller ---
    function setAvatarExpression(mood) {
      switch (mood) {
        case 'excited':
          mouth.setAttribute('d', 'M 92 84 Q 100 94, 108 84'); // Big smile
          eyebrowLeft.setAttribute('d', 'M 80 64 Q 87 60, 93 65');
          eyebrowRight.setAttribute('d', 'M 107 65 Q 113 60, 120 64');
          blushLeft.style.opacity = '0.8';
          blushRight.style.opacity = '0.8';
          handLeft.style.transform = 'translateY(-12px) scale(1.1)';
          handRight.style.transform = 'translateY(-12px) scale(1.1)';
          break;

        case 'pleading':
          mouth.setAttribute('d', 'M 94 88 Q 100 82, 106 88'); // Sad frown
          eyebrowLeft.setAttribute('d', 'M 80 68 Q 87 72, 93 68');
          eyebrowRight.setAttribute('d', 'M 107 68 Q 113 72, 120 68');
          blushLeft.style.opacity = '0.2';
          blushRight.style.opacity = '0.2';
          handLeft.style.transform = 'translate(8px, -5px)';
          handRight.style.transform = 'translate(-8px, -5px)';
          break;

        case 'overjoyed':
          mouth.setAttribute('d', 'M 90 82 Q 100 100, 110 82 Z'); // Open joyful mouth
          mouth.setAttribute('fill', '#f43f5e');
          blushLeft.style.opacity = '1';
          blushRight.style.opacity = '1';
          handLeft.style.transform = 'translateY(-22px) rotate(-15deg)';
          handRight.style.transform = 'translateY(-22px) rotate(15deg)';
          speechBubble.innerText = "YAY!! It's a date! 🎉🥷";
          break;

        case 'neutral':
        default:
          mouth.setAttribute('d', 'M 94 85 Q 100 87, 106 85');
          mouth.setAttribute('fill', 'none');
          eyebrowLeft.setAttribute('d', 'M 80 67 Q 87 65, 93 68');
          eyebrowRight.setAttribute('d', 'M 107 68 Q 113 65, 120 67');
          blushLeft.style.opacity = '0';
          blushRight.style.opacity = '0';
          handLeft.style.transform = 'translate(0,0)';
          handRight.style.transform = 'translate(0,0)';
          break;
      }
    }

    // --- Hover Receptivity on Yes Button ---
    btnYes.addEventListener('mouseenter', () => {
      setAvatarExpression('excited');
      speechBubble.innerText = "Press it! Press YES! 💖";
    });
    btnYes.addEventListener('mouseleave', () => {
      setAvatarExpression('neutral');
      speechBubble.innerText = "Pssst... I have a proposal! 🥷";
    });

    // --- Runaway "No" Button Mechanics ---
    const noDialogues = [
      "Are you sure? 🥺",
      "Catch me if you can! 🥷",
      "Shadow Clone Jutsu! 💨",
      "Nice try! 😜",
      "Wrong button! 💖",
      "Too slow! ⚡",
      "You know you want to say Yes! 😉"
    ];

    function dodgeNoButton() {
      state.noHoverCount++;
      setAvatarExpression('pleading');

      // Update Speech Dialogue
      const dialogue = noDialogues[Math.min(state.noHoverCount - 1, noDialogues.length - 1)];
      speechBubble.innerText = dialogue;

      // Calculate safe runaway position inside boundary
      const bRect = boundary.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();

      const maxX = bRect.width - btnRect.width - 20;
      const maxY = bRect.height - btnRect.height - 10;

      const randomX = (Math.random() * maxX) - (maxX / 2);
      const randomY = (Math.random() * maxY) - (maxY / 2);

      btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });

    // --- YES Button Click Handler ---
    btnYes.addEventListener('click', () => {
      setAvatarExpression('overjoyed');

      // Trigger Confetti Explosion
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#818cf8', '#fbbf24']
        });
      }

      // Transition smoothly to Planner Step
      setTimeout(() => {
        stepProposal.classList.add('hidden');
        stepPlanner.classList.remove('hidden');
      }, 600);
    });

    // --- Activity Selection Logic ---
    const activityBtns = document.querySelectorAll('#activity-options .option-btn');
    activityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activityBtns.forEach(b => {
          b.classList.remove('active', 'bg-rose-500/20', 'border-rose-500/50', 'text-rose-200');
          b.classList.add('bg-slate-800/80', 'border-slate-700', 'text-slate-300');
        });

        btn.classList.add('active', 'bg-rose-500/20', 'border-rose-500/50', 'text-rose-200');
        btn.classList.remove('bg-slate-800/80', 'border-slate-700', 'text-slate-300');

        state.selectedActivity = btn.getAttribute('data-value');
      });
    });

    // --- Lock In Date / Summary Generation ---
    document.getElementById('btn-lock-in').addEventListener('click', () => {
      state.date = document.getElementById('date-picker').value || state.date;
      state.time = document.getElementById('time-picker').value || state.time;
      state.snack = document.getElementById('snack-select').value;

      document.getElementById('sum-activity').innerText = state.selectedActivity;
      document.getElementById('sum-date').innerText = state.date;
      document.getElementById('sum-time').innerText = state.time;
      document.getElementById('sum-snack').innerText = state.snack;

      stepPlanner.classList.add('hidden');
      stepSummary.classList.remove('hidden');

      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    });

    // --- Copy Shareable Summary to Clipboard ---
    document.getElementById('btn-copy').addEventListener('click', async () => {
      const summaryText = `🥷 Secret Date Invitation Sealed!\n\nActivity: ${state.selectedActivity}\nDate: ${state.date}\nTime: ${state.time}\nSnack Target: ${state.snack}\n\nSee you there! ✨`;
      const copyBtn = document.getElementById('btn-copy');

      try {
        await navigator.clipboard.writeText(summaryText);
        copyBtn.innerHTML = '<span>✅ Copied!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = '<span>📋 Copy Invite</span>';
        }, 2000);
      } catch (error) {
        console.error('Unable to copy the invite:', error);
        copyBtn.innerHTML = '<span>⚠️ Copy failed</span>';
        setTimeout(() => {
          copyBtn.innerHTML = '<span>📋 Copy Invite</span>';
        }, 2000);
      }
    });

    // --- Edit Details / Reset Flow ---
    document.getElementById('btn-restart').addEventListener('click', () => {
      stepSummary.classList.add('hidden');
      stepPlanner.classList.remove('hidden');
    });

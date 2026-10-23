document.addEventListener('DOMContentLoaded', () => {
  const get = (id) => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Required page element is missing: #${id}`);
    return element;
  };

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

  const avatarHead = get('ninja-head');
  const avatarContainer = get('avatar-container');
  const leftEye = get('eye-left-pupil');
  const rightEye = get('eye-right-pupil');
  const mouth = get('ninja-mouth');
  const eyebrowLeft = get('brow-left');
  const eyebrowRight = get('brow-right');
  const blushLeft = get('blush-left');
  const blushRight = get('blush-right');
  const handLeft = get('hand-left');
  const handRight = get('hand-right');
  const speechBubble = get('speech-bubble');
  const btnYes = get('btn-yes');
  const btnNo = get('btn-no');
  const boundary = get('button-boundary');
  const stepProposal = get('step-proposal');
  const stepPlanner = get('step-planner');
  const stepSummary = get('step-summary');
  const datePicker = get('date-picker');
  const timePicker = get('time-picker');
  const snackSelect = get('snack-select');
  const copyBtn = get('btn-copy');

  datePicker.value = state.date;

  function initParticles() {
    const container = get('particle-container');
    const symbols = ['✦', '✧', '✨', '⋆', '🌸', '💖', '⭐'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 28; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.setAttribute('aria-hidden', 'true');
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${7 + Math.random() * 9}s`;
      particle.style.animationDelay = `${Math.random() * -15}s`;
      particle.style.fontSize = `${12 + Math.random() * 16}px`;
      fragment.appendChild(particle);
    }
    container.replaceChildren(fragment);
  }
  initParticles();

  function trackPointer(event) {
    const rect = avatarContainer.getBoundingClientRect();
    const deltaX = event.clientX - (rect.left + rect.width / 2);
    const deltaY = event.clientY - (rect.top + rect.height / 2);
    const moveX = Math.max(-3.5, Math.min(3.5, deltaX / 35));
    const moveY = Math.max(-3.5, Math.min(3.5, deltaY / 35));
    const tiltX = Math.max(-5, Math.min(5, deltaX / 80));
    const tiltY = Math.max(-5, Math.min(5, deltaY / 80));

    [leftEye, rightEye].forEach((eye) => {
      eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    avatarHead.style.transform = `translate(${tiltX}px, ${tiltY}px)`;
  }

  document.addEventListener('pointermove', trackPointer, { passive: true });

  function setAvatarExpression(mood) {
    switch (mood) {
      case 'excited':
        mouth.setAttribute('d', 'M 92 84 Q 100 94, 108 84');
        eyebrowLeft.setAttribute('d', 'M 80 64 Q 87 60, 93 65');
        eyebrowRight.setAttribute('d', 'M 107 65 Q 113 60, 120 64');
        blushLeft.style.opacity = '0.8';
        blushRight.style.opacity = '0.8';
        handLeft.style.transform = 'translateY(-12px) scale(1.1)';
        handRight.style.transform = 'translateY(-12px) scale(1.1)';
        break;
      case 'pleading':
        mouth.setAttribute('d', 'M 94 88 Q 100 82, 106 88');
        eyebrowLeft.setAttribute('d', 'M 80 68 Q 87 72, 93 68');
        eyebrowRight.setAttribute('d', 'M 107 68 Q 113 72, 120 68');
        blushLeft.style.opacity = '0.2';
        blushRight.style.opacity = '0.2';
        handLeft.style.transform = 'translate(8px, -5px)';
        handRight.style.transform = 'translate(-8px, -5px)';
        break;
      case 'overjoyed':
        mouth.setAttribute('d', 'M 90 82 Q 100 100, 110 82 Z');
        mouth.setAttribute('fill', '#f43f5e');
        blushLeft.style.opacity = '1';
        blushRight.style.opacity = '1';
        handLeft.style.transform = 'translateY(-22px) rotate(-15deg)';
        handRight.style.transform = 'translateY(-22px) rotate(15deg)';
        speechBubble.textContent = "YAY!! It's a date! 🎉🥷";
        break;
      default:
        mouth.setAttribute('d', 'M 94 85 Q 100 87, 106 85');
        mouth.setAttribute('fill', 'none');
        eyebrowLeft.setAttribute('d', 'M 80 67 Q 87 65, 93 68');
        eyebrowRight.setAttribute('d', 'M 107 68 Q 113 65, 120 67');
        blushLeft.style.opacity = '0';
        blushRight.style.opacity = '0';
        handLeft.style.transform = 'translate(0,0)';
        handRight.style.transform = 'translate(0,0)';
    }
  }

  btnYes.addEventListener('pointerenter', () => {
    setAvatarExpression('excited');
    speechBubble.textContent = 'Press it! Press YES! 💖';
  });
  btnYes.addEventListener('pointerleave', () => {
    setAvatarExpression('neutral');
    speechBubble.textContent = 'Pssst... I have a proposal! 🥷';
  });

  const noDialogues = [
    'Are you sure? 🥺',
    'Catch me if you can! 🥷',
    'Shadow Clone Jutsu! 💨',
    'Nice try! 😜',
    'Wrong button! 💖',
    'Too slow! ⚡',
    'You know you want to say Yes! 😉'
  ];

  function dodgeNoButton() {
    state.noHoverCount++;
    setAvatarExpression('pleading');
    speechBubble.textContent = noDialogues[
      Math.min(state.noHoverCount - 1, noDialogues.length - 1)
    ];

    const boundaryRect = boundary.getBoundingClientRect();
    const buttonRect = btnNo.getBoundingClientRect();
    const maxX = Math.max(0, (boundaryRect.width - buttonRect.width) / 2 - 8);
    const maxY = Math.max(0, (boundaryRect.height - buttonRect.height) / 2 - 8);
    const randomX = (Math.random() * 2 - 1) * maxX;
    const randomY = (Math.random() * 2 - 1) * maxY;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  btnNo.addEventListener('pointerenter', dodgeNoButton);
  btnNo.addEventListener('click', () => {
    if (state.noHoverCount === 0) dodgeNoButton();
  });

  btnYes.addEventListener('click', () => {
    setAvatarExpression('overjoyed');
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#818cf8', '#fbbf24']
      });
    }
    stepProposal.classList.add('hidden');
    stepPlanner.classList.remove('hidden');
  });

  const activityButtons = document.querySelectorAll('#activity-options .option-btn');
  activityButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activityButtons.forEach((option) => {
        option.classList.remove('active', 'bg-rose-500/20', 'border-rose-500/50', 'text-rose-200');
        option.classList.add('bg-slate-800/80', 'border-slate-700', 'text-slate-300');
        option.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active', 'bg-rose-500/20', 'border-rose-500/50', 'text-rose-200');
      button.classList.remove('bg-slate-800/80', 'border-slate-700', 'text-slate-300');
      button.setAttribute('aria-pressed', 'true');
      state.selectedActivity = button.dataset.value;
    });
  });

  get('btn-lock-in').addEventListener('click', () => {
    state.date = datePicker.value || state.date;
    state.time = timePicker.value || state.time;
    state.snack = snackSelect.value;

    get('sum-activity').textContent = state.selectedActivity;
    get('sum-date').textContent = state.date;
    get('sum-time').textContent = state.time;
    get('sum-snack').textContent = state.snack;

    stepPlanner.classList.add('hidden');
    stepSummary.classList.remove('hidden');
    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  });

  copyBtn.addEventListener('click', async () => {
    const text = `🥷 Secret Date Invitation Sealed!\n\nActivity: ${state.selectedActivity}\nDate: ${state.date}\nTime: ${state.time}\nSnack Target: ${state.snack}\n\nSee you there! ✨`;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<span>✅ Copied!</span>';
    } catch (error) {
      console.error('Unable to copy the invite:', error);
      copyBtn.innerHTML = '<span>⚠️ Copy failed</span>';
    }
    window.setTimeout(() => {
      copyBtn.innerHTML = '<span>📋 Copy Invite</span>';
    }, 2000);
  });

  get('btn-restart').addEventListener('click', () => {
    stepSummary.classList.add('hidden');
    stepPlanner.classList.remove('hidden');
  });
});

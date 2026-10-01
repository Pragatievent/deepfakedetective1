// Navigation & Section Switching Logic
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('app-sidebar');
        sidebar.classList.remove('mobile-open');
        document.body.classList.remove('sidebar-active');
    }

    window.scrollTo(0, 0);
}

// Mobile Hamburger Menu Toggle
function toggleMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    sidebar.classList.toggle('mobile-open');
    document.body.classList.toggle('sidebar-active');
}

// Multi-Slot Image Challenge Verification Logic (3 Slots)
const imageChallengeAnswers = {
    1: 'fake', 
    2: 'real', 
    3: 'fake'  
};

const imageChallengeExplanations = {
    1: 'Correct! 🎯 Notice asymmetrical earrings and blurred background edges typical of generative models.',
    2: 'Correct! 🎯 This is an authentic photograph with natural optical depth and lighting.',
    3: 'Correct! 🎯 Notice the distorted cutlery geometry and unnatural texture blending common in synthetic food generation.'
};

function checkImageSlot(slotNumber, userChoice) {
    const feedbackEl = document.getElementById(`feedback-${slotNumber}`);
    const correctAnswer = imageChallengeAnswers[slotNumber];

    if (userChoice === correctAnswer) {
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.innerHTML = imageChallengeExplanations[slotNumber];
    } else {
        feedbackEl.style.color = 'var(--danger)';
        feedbackEl.innerHTML = 'Incorrect. ❌ Analyze the fine textures, lighting, and edges closer!';
    }
}

// Multi-Slot Video Challenge Verification Logic (3 Slots)
const videoChallengeAnswers = {
    1: 'fake', 
    2: 'real', 
    3: 'fake'  
};

const videoChallengeExplanations = {
    1: 'Correct! 🎯 This is a Face-Swap deepfake. Notice the subtle blurring or skin-tone mismatch along the jawline.',
    2: 'Correct! 🎯 Well spotted! Natural movement, consistent lighting, textures, and background details indicate that this is real footage.',
    3: 'Correct! 🎯 Great observation! Small inconsistencies in movement, appearance, lighting, and background can reveal AI-generated content.'
};

function checkVideoSlot(slotNumber, userChoice) {
    const feedbackEl = document.getElementById(`video-feedback-${slotNumber}`);
    const correctAnswer = videoChallengeAnswers[slotNumber];

    if (userChoice === correctAnswer) {
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.innerHTML = videoChallengeExplanations[slotNumber];
    } else {
        feedbackEl.style.color = 'var(--danger)';
        feedbackEl.innerHTML = 'Incorrect. ❌ It’s easy to be fooled! AI videos can look realistic. Check faces, movement, hands, lighting, shadows, and frame-to-frame consistency carefully.';
    }
}

// Enhanced Scenario-Based Quiz Logic (8 Questions)
const quizData = [
    {
        question: "You receive a video of a public official making a shocking statement. What should you do first?",
        options: [
            "Immediately share it on social media to warn others",
            "Trust the video because high-definition video cannot be faked",
            "Check the source and look for independent confirmation from mainstream journalism",
            "Download and repost it in group chats"
        ],
        correct: 2,
        explanation: "Correct! 🧠 Always verify source credibility and look for independent journalistic corroboration before reacting or sharing."
    },
    {
        question: "What neural network architecture is most commonly associated with generating realistic synthetic images and faces?",
        options: ["GANs (Generative Adversarial Networks)", "SQL Databases", "TCP/IP Protocol", "SMTP Mail Servers"],
        correct: 0,
        explanation: "Correct! 🧠 GANs pit two neural networks against each other (generator vs. discriminator) to produce hyper-realistic synthetic media."
    },
    {
        question: "What is 'The Liar's Dividend'?",
        options: [
            "Financial payouts given to whistleblowers who expose deepfakes",
            "When real media evidence of misconduct is dismissed as 'just a deepfake'",
            "A government tax on AI software developers",
            "An algorithm reward for high accuracy detection"
        ],
        correct: 1,
        explanation: "Correct! 🧠 The Liar's Dividend occurs when widespread awareness of deepfakes allows wrongdoers to falsely dismiss genuine evidence against them."
    },
    {
        question: "Which of the following is a classic audio indicator of a voice clone/deepfake?",
        options: [
            "Mechanical robotic humming sounds throughout",
            "Unnatural breathing pauses, metallic artifacts, or missing background room tone",
            "Crystal clear studio sound quality always",
            "Extremely high volume levels"
        ],
        correct: 1,
        explanation: "Correct! 🧠 Voice clones often lack natural acoustic breathing transitions and acoustic room ambiance."
    },
    {
        question: "True or False: All AI-generated synthetic media is inherently malicious and illegal.",
        options: ["True", "False"],
        correct: 1,
        explanation: "Correct! 🧠 Synthetic media has valid uses in entertainment, video games, accessibility, and education. Harm arises from deceptive deployment."
    },
    {
        question: "If a friend calls you sounding distressed and asking for an emergency wire transfer, but something sounds off, what is the safest protocol?",
        options: [
            "Send the money immediately to avoid delay",
            "Hang up and call your friend back on their known, verified personal number",
            "Ask them a secret password over the same call",
            "Post the audio recording online"
        ],
        correct: 1,
        explanation: "Correct! 🧠 Live audio deepfakes can impersonate voices in real-time. Always disconnect and verify via a separate known channel."
    },
    {
        question: "Why is single-frame visual inspection alone unreliable for detecting AI video?",
        options: [
            "Because computers cannot process video frames",
            "Because generative models constantly improve, and manual human eye detection can easily miss subtle artifacts",
            "Because videos do not have pixels",
            "Because the human eye is infallible"
        ],
        correct: 1,
        explanation: "Correct! 🧠 AI models rapidly evolve to eliminate visual artifacts, making contextual source verification essential."
    },
    {
        question: "What does STOP &rarr; CHECK &rarr; VERIFY &rarr; THEN SHARE mean in digital safety?",
        options: [
            "A video game cheat code",
            "A disciplined workflow to prevent the viral spread of misinformation and synthetic media",
            "An algorithm setting",
            "A file compression standard"
        ],
        correct: 1,
        explanation: "Correct! 🧠 Pausing before amplification halts the engagement loops that weaponize misinformation."
    }
];

let currentQuizIndex = 0;
let score = 0;

function loadQuiz() {
    const progressEl = document.getElementById('quiz-progress');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const explanationEl = document.getElementById('quiz-explanation');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuizIndex < quizData.length) {
        const currentData = quizData[currentQuizIndex];
        if (progressEl) progressEl.innerHTML = `Question ${currentQuizIndex + 1} of ${quizData.length} &bull; Current Score: ${score}`;
        if (questionEl) questionEl.innerHTML = currentData.question;
        if (optionsEl) optionsEl.innerHTML = '';
        if (explanationEl) explanationEl.innerHTML = '';
        if (nextBtn) nextBtn.style.display = 'none';

        currentData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerText = option;
            btn.onclick = () => selectQuizOption(index, currentData.correct, currentData.explanation);
            optionsEl.appendChild(btn);
        });
    } else {
        if (progressEl) progressEl.innerHTML = `Quiz Completed! 🎉`;
        if (questionEl) questionEl.innerHTML = `Final Evaluation Score: ${score} / ${quizData.length}`;
        
        let badge = "Beginner 🟢";
        if (score >= 6) badge = "Detective 🟣";
        else if (score >= 4) badge = "Aware 🔵";

        if (optionsEl) optionsEl.innerHTML = `
            <div style="text-align:center; padding: 1rem;">
                <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent); margin-bottom: 0.5rem;">Rank: ${badge}</p>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Remember: realistic-looking content isn't automatically authentic. Verification matters.</p>
                <button class="btn" onclick="retakeQuiz()">Retake Quiz</button>
            </div>
        `;
        if (explanationEl) explanationEl.innerHTML = '';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}

function selectQuizOption(selectedIndex, correctIndex, explanationText) {
    const optionsEl = document.getElementById('quiz-options');
    const buttons = optionsEl.getElementsByTagName('button');
    const explanationEl = document.getElementById('quiz-explanation');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correctIndex) {
            buttons[i].style.backgroundColor = 'var(--success)';
        } else if (i === selectedIndex) {
            buttons[i].style.backgroundColor = 'var(--danger)';
        }
    }

    if (selectedIndex === correctIndex) {
        score++;
    }

    if (explanationEl) {
        explanationEl.innerHTML = `<div style="background: var(--bg-primary); padding: 1rem; border-radius: 6px; border: 1px solid var(--border-color);">${explanationText}</div>`;
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuizIndex++;
    loadQuiz();
}

function retakeQuiz() {
    currentQuizIndex = 0;
    score = 0;
    loadQuiz();
}

// Survey persistence & email deduplication logic (Sections A-E)
let surveyDataSummary = {
    totalSubmissions: 0,
    ages: { "under 18": 0, "18 - 20": 0, "21 - 25": 0, "above 25": 0 },
    occupations: { "Student": 0, "Working": 0, "Other": 0 },
    a: { "Yes": 0, "No": 0 },
    b: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    c: { "Yes": 0, "No": 0, "Not Sure": 0 },
    d: { "Check original source": 0, "Search for other reports": 0, "Ask someone": 0, "Share it anyway": 0, "Not sure": 0 },
    e: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
};

let submittedEmails = [];

function loadStoredSurveyData() {
    const savedData = localStorage.getItem('deepfakeSurveySummaryV2');
    const savedEmails = localStorage.getItem('deepfakeSubmittedEmailsV2');

    if (savedData) {
        surveyDataSummary = JSON.parse(savedData);
    }
    if (savedEmails) {
        submittedEmails = JSON.parse(savedEmails);
    }
    renderSurveyStats();
}

function renderBarChart(title, dataObj, total) {
    let html = `<div style="margin-bottom: 1.5rem;"><p style="font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem;">${title}</p>`;
    for (let key in dataObj) {
        let count = dataObj[key];
        let pct = total > 0 ? Math.round((count / total) * 100) : 0;
        html += `
            <div style="margin-bottom: 0.3rem; font-size: 0.85rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                    <span>${key}</span><span>${count} (${pct}%)</span>
                </div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${pct}%;"></div>
                </div>
            </div>
        `;
    }
    html += `</div>`;
    return html;
}

function calculateAverage(dataObj) {
    let sum = 0;
    let count = 0;
    for (let key in dataObj) {
        let val = Number(key);
        let freq = dataObj[key];
        if (!isNaN(val)) {
            sum += val * freq;
            count += freq;
        }
    }
    return count > 0 ? (sum / count).toFixed(1) : "0.0";
}

function renderSurveyStats() {
    const total = surveyDataSummary.totalSubmissions;
    const statsEl = document.getElementById('result-stats');
    if (!statsEl) return;

    if (total === 0) {
        statsEl.innerHTML = `No responses recorded yet. Be the first to submit via the Survey Form!`;
        return;
    }

    const avgBefore = calculateAverage(surveyDataSummary.b);
    const avgAfter = calculateAverage(surveyDataSummary.e);

    statsEl.innerHTML = `
        <p style="font-size: 1.1rem; font-weight: bold; color: var(--accent); margin-bottom: 0.5rem;">Total Community Submissions: ${total}</p>
        <p style="font-size: 0.95rem; color: var(--success); margin-bottom: 1rem;">
            📊 <strong>Measurable Outcome:</strong> Average confidence before was <strong>${avgBefore} / 5</strong>, and increased to <strong>${avgAfter} / 5</strong> after interacting with the awareness material!
        </p>
        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">
        ${renderBarChart('Age Demographics', surveyDataSummary.ages, total)}
        ${renderBarChart('Occupation', surveyDataSummary.occupations, total)}
        ${renderBarChart('Section A: Heard of deepfakes before?', surveyDataSummary.a, total)}
        ${renderBarChart('Section B: Confidence Before (1-5)', surveyDataSummary.b, total)}
        ${renderBarChart('Section C: Encountered AI content online?', surveyDataSummary.c, total)}
        ${renderBarChart('Section D: Action before sharing suspicious content', surveyDataSummary.d, total)}
        ${renderBarChart('Section E: Confidence After (1-5)', surveyDataSummary.e, total)}
        <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 1rem; font-family: 'JetBrains Mono', monospace;">
            * Based on responses collected through this project.
        </p>
    `;
}

function submitSurvey(event) {
    event.preventDefault();
    
    const email = document.getElementById('survey-email').value.trim().toLowerCase();
    const age = document.getElementById('survey-age').value;
    const occupation = document.getElementById('survey-occupation').value;
    const a = document.getElementById('survey-a').value;
    const b = document.getElementById('survey-b').value;
    const c = document.getElementById('survey-c').value;
    const d = document.getElementById('survey-d').value;
    const e = document.getElementById('survey-e').value;

    if (submittedEmails.includes(email)) {
        alert('⚠️ This email address has already submitted the survey. Each email is allowed only one submission.');
        return;
    }

    if (email && age && occupation && a && b && c && d && e) {
        submittedEmails.push(email);
        localStorage.setItem('deepfakeSubmittedEmailsV2', JSON.stringify(submittedEmails));

        surveyDataSummary.totalSubmissions++;
        surveyDataSummary.ages[age]++;
        surveyDataSummary.occupations[occupation]++;
        surveyDataSummary.a[a]++;
        surveyDataSummary.b[b]++;
        surveyDataSummary.c[c]++;
        surveyDataSummary.d[d]++;
        surveyDataSummary.e[e]++;

        localStorage.setItem('deepfakeSurveySummaryV2', JSON.stringify(surveyDataSummary));

        alert('Thank you for submitting your survey response!');

        document.getElementById('community-survey').reset();
        renderSurveyStats();
        switchSection('survey-results');
    }
}

// Initialize Quiz and Stored Survey Data instantly when HTML is ready
document.addEventListener('DOMContentLoaded', function() {
    loadQuiz();
    loadStoredSurveyData();
});

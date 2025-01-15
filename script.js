async function sendToTelegram(event) {
    event.preventDefault();

    // Збираємо дані з форми
    const vacancy = document.getElementById("vacancy")?.value || "Не вказано";
    const name = document.getElementById("name")?.value || "Не вказано";
    const surname = document.getElementById("surname")?.value || "Не вказано";
    const birthdate = document.getElementById("birthdate")?.value || "Не вказано";
    const phone = document.getElementById("phone")?.value || "Не вказано";
    const email = document.getElementById("email")?.value || "Не вказано";
    const experience = document.getElementById("experience")?.value || "Не вказано";
    const housing = document.getElementById("housing")?.value || "Не вказано";
    const license = document.getElementById("license")?.value || "Не вказано";
    const abroadExperience = document.getElementById("abroad_experience")?.value || "Не вказано";
    const documents = Array.from(document.getElementById("documents")?.selectedOptions || []).map(opt => opt.text).join(", ") || "Не вказано";
    const czechLanguage = document.getElementById("czech_language")?.value || "Не вказано";
    const otherLanguages = document.getElementById("other_languages")?.value || "Не вказано";
    const comment = document.getElementById("comment")?.value || "Не вказано";

    console.log("Дані з форми:", {
        vacancy, name, surname, birthdate, phone, email, experience, housing, license, abroadExperience, documents, czechLanguage, otherLanguages, comment
    });

    // Токен бота та ID чатів
    const token = "7792112194:AAEaIouLDxfYtNykswC6b5Z_bNZ8XbwURys";
    const chatIds = ["989463711", "561027036"];

    // Формуємо текст повідомлення
    const text = `
📝 <b>Новий відгук на вакансію:</b>
🏢 <b>Вакансія:</b> ${vacancy}
👤 <b>Ім'я:</b> ${name}
👤 <b>Прізвище:</b> ${surname}
🎂 <b>Дата народження:</b> ${birthdate}
📞 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email}
🛠 <b>Досвід роботи:</b> ${experience}
🏠 <b>Чи потрібне житло:</b> ${housing}
🚗 <b>Чи є водійські права:</b> ${license}
🌍 <b>Досвід за кордоном:</b> ${abroadExperience}
📄 <b>Документи:</b> ${documents}
🇨🇿 <b>Чеська мова:</b> ${czechLanguage}
🌐 <b>Інші мови:</b> ${otherLanguages}
💬 <b>Коментар:</b> ${comment}
    `;

    console.log("Повідомлення для Telegram:", text);

    // Надсилаємо повідомлення кожному chat_id
    for (const chatId of chatIds) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: text,
            parse_mode: "HTML",
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log(`Повідомлення успішно надіслано до chat_id ${chatId}`);
            } else {
                console.error(`Помилка надсилання для chat_id ${chatId}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Помилка при виконанні fetch для chat_id ${chatId}:`, error);
        }
    }

    alert("Ваш відгук успішно відправлено! Дякуємо!");
    document.querySelector("form")?.reset();
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Посилання скопійовано!");
    }).catch(err => {
        alert("Не вдалося скопіювати посилання.");
        console.error(err);
    });
}


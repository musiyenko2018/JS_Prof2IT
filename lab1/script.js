// Початкові дані у вигляді масивів об'єктів (вимога викладача - рендерити з JS)
const teachers = [
    { id: 1, name: "Коваленко О.П.", degree: "доцент", position: "завідувач кафедри", subject: "Хмарні технології", experience: 15, rate: 1.0 },
    { id: 2, name: "Бондаренко І.В.", degree: "професор", position: "професор", subject: "Штучний інтелект", experience: 22, rate: 1.0 },
    { id: 3, name: "Ткаченко М.С.", degree: "старший викладач", position: "викладач", subject: "Комп'ютерні мережі", experience: 8, rate: 0.75 }
];

const subjects = [
    { id: 1, title: "Хмарні технології", code: "ОК-12", hours: 120, credits: 4, semester: 5, control: "Екзамен" },
    { id: 2, title: "Штучний інтелект", code: "ВК-04", hours: 150, credits: 5, semester: 6, control: "Екзамен" },
    { id: 3, title: "Комп'ютерні мережі", code: "ОК-08", hours: 90, credits: 3, semester: 4, control: "Залік" }
];

const groups = [
    { id: 1, name: "КІ-21", specialty: "123 Комп'ютерна інженерія", course: 3, studentsCount: 24, curator: "Коваленко О.П.", form: "Денна" },
    { id: 2, name: "АІ-22", specialty: "174 Автоматизація", course: 2, studentsCount: 19, curator: "Бондаренко І.В.", form: "Денна" },
    { id: 3, name: "КІ-20з", specialty: "123 Комп'ютерна інженерія", course: 4, studentsCount: 15, curator: "Ткаченко М.С.", form: "Заочна" }
];

// Функція для перемикання табів та побудови таблиць
function openTab(tabName) {
    const container = document.getElementById("table-container");
    let html = "";

    if (tabName === "teachers") {
        html = `<h3>Викладачі</h3>
        <table border="1" cellpadding="6" cellspacing="0">
            <tr>
                <th>ID</th><th>ПІБ</th><th>Вчене звання</th><th>Посада</th><th>Дисципліна</th><th>Стаж (років)</th><th>Ставка</th>
            </tr>`;
        for (let i = 0; i < teachers.length; i++) {
            html += `<tr>
                <td>${teachers[i].id}</td>
                <td>${teachers[i].name}</td>
                <td>${teachers[i].degree}</td>
                <td>${teachers[i].position}</td>
                <td>${teachers[i].subject}</td>
                <td>${teachers[i].experience}</td>
                <td>${teachers[i].rate}</td>
            </tr>`;
        }
        html += `</table>`;
    } 
    else if (tabName === "subjects") {
        html = `<h3>Дисципліни</h3>
        <table border="1" cellpadding="6" cellspacing="0">
            <tr>
                <th>ID</th><th>Назва</th><th>Шифр</th><th>Годин</th><th>Кредитів ЄКТС</th><th>Семестр</th><th>Контроль</th>
            </tr>`;
        for (let i = 0; i < subjects.length; i++) {
            html += `<tr>
                <td>${subjects[i].id}</td>
                <td>${subjects[i].title}</td>
                <td>${subjects[i].code}</td>
                <td>${subjects[i].hours}</td>
                <td>${subjects[i].credits}</td>
                <td>${subjects[i].semester}</td>
                <td>${subjects[i].control}</td>
            </tr>`;
        }
        html += `</table>`;
    } 
    else if (tabName === "groups") {
        html = `<h3>Групи</h3>
        <table border="1" cellpadding="6" cellspacing="0">
            <tr>
                <th>ID</th><th>Шифр групи</th><th>Спеціальність</th><th>Курс</th><th>К-сть студентів</th><th>Куратор</th><th>Форма навчання</th>
            </tr>`;
        for (let i = 0; i < groups.length; i++) {
            html += `<tr>
                <td>${groups[i].id}</td>
                <td>${groups[i].name}</td>
                <td>${groups[i].specialty}</td>
                <td>${groups[i].course}</td>
                <td>${groups[i].studentsCount}</td>
                <td>${groups[i].curator}</td>
                <td>${groups[i].form}</td>
            </tr>`;
        }
        html += `</table>`;
    }

    container.innerHTML = html;
}

// Відкриваємо першу вкладку за замовчуванням при завантаженні сторінки
openTab("teachers");

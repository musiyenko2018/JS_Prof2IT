// початкові дані (використовуються якщо localStorage ще порожній)
const defaultTeachers = [
    { id: 1, name: "Коваленко О.П.", degree: "доцент", position: "завідувач кафедри", subject: "Хмарні технології", experience: 15, rate: 1.0 },
    { id: 2, name: "Бондаренко І.В.", degree: "професор", position: "професор", subject: "Штучний інтелект", experience: 22, rate: 1.0 },
    { id: 3, name: "Ткаченко М.С.", degree: "старший викладач", position: "викладач", subject: "Комп'ютерні мережі", experience: 8, rate: 0.75 }
];

const defaultSubjects = [
    { id: 1, title: "Хмарні технології", code: "ОК-12", hours: 120, credits: 4, semester: 5, control: "Екзамен" },
    { id: 2, title: "Штучний інтелект", code: "ВК-04", hours: 150, credits: 5, semester: 6, control: "Екзамен" },
    { id: 3, title: "Комп'ютерні мережі", code: "ОК-08", hours: 90, credits: 3, semester: 4, control: "Залік" }
];

const defaultGroups = [
    { id: 1, name: "КІ-21", specialty: "123 Комп'ютерна інженерія", course: 3, count: 24, curator: "Коваленко О.П.", form: "Денна" },
    { id: 2, name: "АІ-22", specialty: "174 Автоматизація", course: 2, count: 19, curator: "Бондаренко І.В.", form: "Денна" },
    { id: 3, name: "КІ-20з", specialty: "123 Комп'ютерна інженерія", course: 4, count: 15, curator: "Ткаченко М.С.", form: "Заочна" }
];

let teachers = [];
let subjects = [];
let groups = [];

var currentTab = "teachers";

// завантаження даних з localStorage
function loadFromStorage() {
    let savedTeachers = localStorage.getItem("kafedra_teachers");
    let savedSubjects = localStorage.getItem("kafedra_subjects");
    let savedGroups = localStorage.getItem("kafedra_groups");

    if (savedTeachers && savedSubjects && savedGroups) {
        teachers = JSON.parse(savedTeachers);
        subjects = JSON.parse(savedSubjects);
        groups = JSON.parse(savedGroups);
    } else {
        teachers = JSON.parse(JSON.stringify(defaultTeachers));
        subjects = JSON.parse(JSON.stringify(defaultSubjects));
        groups = JSON.parse(JSON.stringify(defaultGroups));
        saveToStorage();
    }
}

// збереження всіх масивів у localStorage
function saveToStorage() {
    localStorage.setItem("kafedra_teachers", JSON.stringify(teachers));
    localStorage.setItem("kafedra_subjects", JSON.stringify(subjects));
    localStorage.setItem("kafedra_groups", JSON.stringify(groups));
    console.log("Дані збережено в localStorage");
}

// скидання до початкових даних
function resetData() {
    localStorage.removeItem("kafedra_teachers");
    localStorage.removeItem("kafedra_subjects");
    localStorage.removeItem("kafedra_groups");
    loadFromStorage();
    openTab(currentTab);
}

// синхронізація між кількома відкритими вкладками браузера
window.addEventListener("storage", function(event) {
    if (event.key == "kafedra_teachers" || event.key == "kafedra_subjects" || event.key == "kafedra_groups") {
        console.log("Оновлення з іншої вкладки!");
        loadFromStorage();
        openTab(currentTab);
    }
});

function openTab(tabName) {
    currentTab = tabName;
    document.getElementById("form-container").innerHTML = "";
    
    let container = document.getElementById("table-container");
    let html = "";

    if (tabName == "teachers") {
        html = '<h3>Викладачі</h3><p><small>* Натисніть на ПІБ, щоб змінити</small></p><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>ПІБ</th><th>Звання</th><th>Посада</th><th>Дисципліна</th><th>Стаж</th><th>Ставка</th><th>Дія</th></tr>';
        for (let i = 0; i < teachers.length; i++) {
            html += '<tr>' +
                '<td>' + teachers[i].id + '</td>' +
                '<td onclick="editCell(this, \'teachers\', ' + i + ', \'name\')" style="cursor:pointer;">' + teachers[i].name + '</td>' +
                '<td>' + teachers[i].degree + '</td>' +
                '<td>' + teachers[i].position + '</td>' +
                '<td>' + teachers[i].subject + '</td>' +
                '<td>' + teachers[i].experience + '</td>' +
                '<td>' + teachers[i].rate + '</td>' +
                '<td><button onclick="deleteRow(\'teachers\', ' + i + ')">X</button></td>' +
            '</tr>';
        }
        html += '</table>';
    } 
    else if (tabName == "subjects") {
        html = '<h3>Дисципліни</h3><p><small>* Натисніть на назву, щоб змінити</small></p><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>Назва</th><th>Шифр</th><th>Годин</th><th>Кредитів</th><th>Семестр</th><th>Контроль</th><th>Дія</th></tr>';
        for (let i = 0; i < subjects.length; i++) {
            html += '<tr>' +
                '<td>' + subjects[i].id + '</td>' +
                '<td onclick="editCell(this, \'subjects\', ' + i + ', \'title\')" style="cursor:pointer;">' + subjects[i].title + '</td>' +
                '<td>' + subjects[i].code + '</td>' +
                '<td>' + subjects[i].hours + '</td>' +
                '<td>' + subjects[i].credits + '</td>' +
                '<td>' + subjects[i].semester + '</td>' +
                '<td>' + subjects[i].control + '</td>' +
                '<td><button onclick="deleteRow(\'subjects\', ' + i + ')">X</button></td>' +
            '</tr>';
        }
        html += '</table>';
    } 
    else if (tabName == "groups") {
        html = '<h3>Групи</h3><p><small>* Натисніть на шифр групи, щоб змінити</small></p><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>Група</th><th>Спеціальність</th><th>Курс</th><th>Студентів</th><th>Куратор</th><th>Форма</th><th>Дія</th></tr>';
        for (let i = 0; i < groups.length; i++) {
            html += '<tr>' +
                '<td>' + groups[i].id + '</td>' +
                '<td onclick="editCell(this, \'groups\', ' + i + ', \'name\')" style="cursor:pointer;">' + groups[i].name + '</td>' +
                '<td>' + groups[i].specialty + '</td>' +
                '<td>' + groups[i].course + '</td>' +
                '<td>' + groups[i].count + '</td>' +
                '<td>' + groups[i].curator + '</td>' +
                '<td>' + groups[i].form + '</td>' +
                '<td><button onclick="deleteRow(\'groups\', ' + i + ')">X</button></td>' +
            '</tr>';
        }
        html += '</table>';
    }

    container.innerHTML = html;
}

// видалення рядка з перевіркою зв'язків
function deleteRow(type, index) {
    if (type == "teachers") {
        let teacherName = teachers[index].name;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].curator == teacherName) {
                alert("Помилка! Викладач " + teacherName + " закріплений як куратор у таблиці 'Групи'. Видалення неможливе!");
                return;
            }
        }
        teachers.splice(index, 1);
    } 
    else if (type == "subjects") {
        let subjTitle = subjects[index].title;
        for (let i = 0; i < teachers.length; i++) {
            if (teachers[i].subject == subjTitle) {
                alert("Помилка! Дисципліна '" + subjTitle + "' використовується у таблиці 'Викладачі'. Видалення неможливе!");
                return;
            }
        }
        subjects.splice(index, 1);
    } 
    else if (type == "groups") {
        groups.splice(index, 1);
    }

    saveToStorage();
    openTab(currentTab);
}

// зміна даних по кліку на комірку
function editCell(td, type, index, field) {
    if (td.querySelector("input")) {
        return;
    }

    let oldVal = td.innerText;
    let input = document.createElement("input");
    input.type = "text";
    input.value = oldVal;
    
    td.innerHTML = "";
    td.appendChild(input);
    input.focus();

    function saveEdit() {
        let newVal = input.value.trim();
        if (newVal == "") {
            newVal = oldVal;
        }

        if (type == "teachers") {
            // якщо змінили ПІБ викладача, оновлюємо його і в кураторах груп
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].curator == oldVal) {
                    groups[i].curator = newVal;
                }
            }
            teachers[index][field] = newVal;
        } else if (type == "subjects") {
            // якщо змінили назву дисципліни, оновлюємо її і у викладачів
            for (let i = 0; i < teachers.length; i++) {
                if (teachers[i].subject == oldVal) {
                    teachers[i].subject = newVal;
                }
            }
            subjects[index][field] = newVal;
        } else if (type == "groups") {
            groups[index][field] = newVal;
        }

        saveToStorage();
        openTab(currentTab);
    }

    input.onkeydown = function(e) {
        if (e.key == "Enter") {
            saveEdit();
        }
    };

    input.onblur = function() {
        saveEdit();
    };
}

// відкриваємо форму додавання з випадаючими списками з інших таблиць
function showAddForm() {
    let box = document.getElementById("form-container");
    
    if (currentTab == "teachers") {
        // формуємо випадаючий список із існуючих дисциплін
        let subjOptions = "";
        for (let i = 0; i < subjects.length; i++) {
            subjOptions += '<option value="' + subjects[i].title + '">' + subjects[i].title + '</option>';
        }

        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 320px;">' +
            '<b>Новий викладач</b><br><br>' +
            'ПІБ: <input type="text" id="t_name"><br><br>' +
            'Звання: <input type="text" id="t_degree"><br><br>' +
            'Посада: <input type="text" id="t_pos"><br><br>' +
            'Дисципліна: <select id="t_subj">' + subjOptions + '</select><br><br>' +
            'Стаж: <input type="number" id="t_exp"><br><br>' +
            'Ставка: <input type="number" step="0.25" id="t_rate"><br><br>' +
            '<button onclick="addRecord()">Зберегти</button> ' +
            '<button onclick="closeForm()">Закрити</button>' +
        '</div>';
    }
    if (currentTab == "subjects") {
        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 320px;">' +
            '<b>Нова дисципліна</b><br><br>' +
            'Назва: <input type="text" id="s_title"><br><br>' +
            'Шифр: <input type="text" id="s_code"><br><br>' +
            'Годин: <input type="number" id="s_hours"><br><br>' +
            'Кредитів: <input type="number" id="s_cred"><br><br>' +
            'Семестр: <input type="number" id="s_sem"><br><br>' +
            'Контроль: <input type="text" id="s_ctrl"><br><br>' +
            '<button onclick="addRecord()">Зберегти</button> ' +
            '<button onclick="closeForm()">Закрити</button>' +
        '</div>';
    }
    if (currentTab == "groups") {
        // формуємо випадаючий список кураторів із таблиці викладачів
        let curOptions = "";
        for (let i = 0; i < teachers.length; i++) {
            curOptions += '<option value="' + teachers[i].name + '">' + teachers[i].name + '</option>';
        }

        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 320px;">' +
            '<b>Нова група</b><br><br>' +
            'Група: <input type="text" id="g_name"><br><br>' +
            'Спеціальність: <input type="text" id="g_spec"><br><br>' +
            'Курс: <input type="number" id="g_course"><br><br>' +
            'Студентів: <input type="number" id="g_count"><br><br>' +
            'Куратор: <select id="g_cur">' + curOptions + '</select><br><br>' +
            'Форма: <input type="text" id="g_form"><br><br>' +
            '<button onclick="addRecord()">Зберегти</button> ' +
            '<button onclick="closeForm()">Закрити</button>' +
        '</div>';
    }
}

function closeForm() {
    document.getElementById("form-container").innerHTML = "";
}

function addRecord() {
    if (currentTab == "teachers") {
        let name = document.getElementById("t_name").value;
        if (name == "") {
            alert("Заповніть ПІБ!");
            return;
        }
        let newId = teachers.length > 0 ? teachers[teachers.length - 1].id + 1 : 1;
        teachers.push({
            id: newId,
            name: name,
            degree: document.getElementById("t_degree").value,
            position: document.getElementById("t_pos").value,
            subject: document.getElementById("t_subj").value,
            experience: Number(document.getElementById("t_exp").value),
            rate: Number(document.getElementById("t_rate").value)
        });
    } 
    else if (currentTab == "subjects") {
        let title = document.getElementById("s_title").value;
        if (title == "") {
            alert("Введіть назву!");
            return;
        }
        let newId = subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;
        subjects.push({
            id: newId,
            title: title,
            code: document.getElementById("s_code").value,
            hours: Number(document.getElementById("s_hours").value),
            credits: Number(document.getElementById("s_cred").value),
            semester: Number(document.getElementById("s_sem").value),
            control: document.getElementById("s_ctrl").value
        });
    } 
    else if (currentTab == "groups") {
        let gname = document.getElementById("g_name").value;
        if (gname == "") {
            alert("Введіть шифр групи!");
            return;
        }
        let newId = groups.length > 0 ? groups[groups.length - 1].id + 1 : 1;
        groups.push({
            id: newId,
            name: gname,
            specialty: document.getElementById("g_spec").value,
            course: Number(document.getElementById("g_course").value),
            count: Number(document.getElementById("g_count").value),
            curator: document.getElementById("g_cur").value,
            form: document.getElementById("g_form").value
        });
    }

    saveToStorage();
    openTab(currentTab);
}

// спочатку підтягуємо збережені дані з localStorage, потім малюємо таблицю
loadFromStorage();
openTab("teachers");

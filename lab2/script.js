// дані для таблиць
let teachers = [
    { id: 1, name: "Коваленко О.П.", degree: "доцент", position: "завідувач кафедри", subject: "Хмарні технології", experience: 15, rate: 1.0 },
    { id: 2, name: "Бондаренко І.В.", degree: "професор", position: "професор", subject: "Штучний інтелект", experience: 22, rate: 1.0 },
    { id: 3, name: "Ткаченко М.С.", degree: "старший викладач", position: "викладач", subject: "Комп'ютерні мережі", experience: 8, rate: 0.75 }
];

let subjects = [
    { id: 1, title: "Хмарні технології", code: "ОК-12", hours: 120, credits: 4, semester: 5, control: "Екзамен" },
    { id: 2, title: "Штучний інтелект", code: "ВК-04", hours: 150, credits: 5, semester: 6, control: "Екзамен" },
    { id: 3, title: "Комп'ютерні мережі", code: "ОК-08", hours: 90, credits: 3, semester: 4, control: "Залік" }
];

let groups = [
    { id: 1, name: "КІ-21", specialty: "123 Комп'ютерна інженерія", course: 3, count: 24, curator: "Коваленко О.П.", form: "Денна" },
    { id: 2, name: "АІ-22", specialty: "174 Автоматизація", course: 2, count: 19, curator: "Бондаренко І.В.", form: "Денна" },
    { id: 3, name: "КІ-20з", specialty: "123 Комп'ютерна інженерія", course: 4, count: 15, curator: "Ткаченко М.С.", form: "Заочна" }
];

var currentTab = "teachers";

function openTab(tabName) {
    currentTab = tabName;
    document.getElementById("form-container").innerHTML = "";
    
    let container = document.getElementById("table-container");
    let html = "";

    if (tabName == "teachers") {
        html = '<h3>Викладачі</h3><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>ПІБ</th><th>Звання</th><th>Посада</th><th>Дисципліна</th><th>Стаж</th><th>Ставка</th></tr>';
        for (let i = 0; i < teachers.length; i++) {
            html += '<tr>' +
                '<td>' + teachers[i].id + '</td>' +
                '<td>' + teachers[i].name + '</td>' +
                '<td>' + teachers[i].degree + '</td>' +
                '<td>' + teachers[i].position + '</td>' +
                '<td>' + teachers[i].subject + '</td>' +
                '<td>' + teachers[i].experience + '</td>' +
                '<td>' + teachers[i].rate + '</td>' +
            '</tr>';
        }
        html += '</table>';
    } 
    else if (tabName == "subjects") {
        html = '<h3>Дисципліни</h3><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>Назва</th><th>Шифр</th><th>Годин</th><th>Кредитів</th><th>Семестр</th><th>Контроль</th></tr>';
        for (let i = 0; i < subjects.length; i++) {
            html += '<tr>' +
                '<td>' + subjects[i].id + '</td>' +
                '<td>' + subjects[i].title + '</td>' +
                '<td>' + subjects[i].code + '</td>' +
                '<td>' + subjects[i].hours + '</td>' +
                '<td>' + subjects[i].credits + '</td>' +
                '<td>' + subjects[i].semester + '</td>' +
                '<td>' + subjects[i].control + '</td>' +
            '</tr>';
        }
        html += '</table>';
    } 
    else if (tabName == "groups") {
        html = '<h3>Групи</h3><table border="1" cellpadding="5">';
        html += '<tr><th>ID</th><th>Група</th><th>Спеціальність</th><th>Курс</th><th>Студентів</th><th>Куратор</th><th>Форма</th></tr>';
        for (let i = 0; i < groups.length; i++) {
            html += '<tr>' +
                '<td>' + groups[i].id + '</td>' +
                '<td>' + groups[i].name + '</td>' +
                '<td>' + groups[i].specialty + '</td>' +
                '<td>' + groups[i].course + '</td>' +
                '<td>' + groups[i].count + '</td>' +
                '<td>' + groups[i].curator + '</td>' +
                '<td>' + groups[i].form + '</td>' +
            '</tr>';
        }
        html += '</table>';
    }

    container.innerHTML = html;
}

// відкриваємо форму для додавання
function showAddForm() {
    let box = document.getElementById("form-container");
    
    if (currentTab == "teachers") {
        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 300px;">' +
            '<b>Новий викладач</b><br><br>' +
            'ПІБ: <input type="text" id="t_name"><br><br>' +
            'Звання: <input type="text" id="t_degree"><br><br>' +
            'Посада: <input type="text" id="t_pos"><br><br>' +
            'Дисципліна: <input type="text" id="t_subj"><br><br>' +
            'Стаж: <input type="number" id="t_exp"><br><br>' +
            'Ставка: <input type="number" step="0.25" id="t_rate"><br><br>' +
            '<button onclick="addRecord()">Зберегти</button> ' +
            '<button onclick="closeForm()">Закрити</button>' +
        '</div>';
    }
    if (currentTab == "subjects") {
        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 300px;">' +
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
        box.innerHTML = '<div style="border: 1px solid gray; padding: 10px; width: 300px;">' +
            '<b>Нова група</b><br><br>' +
            'Група: <input type="text" id="g_name"><br><br>' +
            'Спеціальність: <input type="text" id="g_spec"><br><br>' +
            'Курс: <input type="number" id="g_course"><br><br>' +
            'Студентів: <input type="number" id="g_count"><br><br>' +
            'Куратор: <input type="text" id="g_cur"><br><br>' +
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
        let newId = teachers.length + 1;
        teachers.push({
            id: newId,
            name: name,
            degree: document.getElementById("t_degree").value,
            position: document.getElementById("t_pos").value,
            subject: document.getElementById("t_subj").value,
            experience: Number(document.getElementById("t_exp").value),
            rate: Number(document.getElementById("t_rate").value)
        });
        console.log("Додано викладача:", teachers);
    } 
    else if (currentTab == "subjects") {
        let title = document.getElementById("s_title").value;
        if (title == "") {
            alert("Введіть назву!");
            return;
        }
        let newId = subjects.length + 1;
        subjects.push({
            id: newId,
            title: title,
            code: document.getElementById("s_code").value,
            hours: Number(document.getElementById("s_hours").value),
            credits: Number(document.getElementById("s_cred").value),
            semester: Number(document.getElementById("s_sem").value),
            control: document.getElementById("s_ctrl").value
        });
        console.log("Додано дисципліну:", subjects);
    } 
    else if (currentTab == "groups") {
        let gname = document.getElementById("g_name").value;
        if (gname == "") {
            alert("Введіть шифр групи!");
            return;
        }
        let newId = groups.length + 1;
        groups.push({
            id: newId,
            name: gname,
            specialty: document.getElementById("g_spec").value,
            course: Number(document.getElementById("g_course").value),
            count: Number(document.getElementById("g_count").value),
            curator: document.getElementById("g_cur").value,
            form: document.getElementById("g_form").value
        });
        console.log("Додано групу:", groups);
    }

    openTab(currentTab);
}

openTab("teachers");

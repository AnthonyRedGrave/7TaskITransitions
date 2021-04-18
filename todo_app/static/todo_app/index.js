function builtToDo(){
    var wrapper_body = document.getElementById('wrapper')
    var url = 'http://127.0.0.1:8000/api/todo/list/'
    wrapper_body.innerHTML = ''
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        console.log(data)
        var list = data
        for (var i in list){
            var item = `
                <div class="item" id="${list[i].id}" style="background: ${list[i].color}">
                    <span title="${list[i].name}" onclick="moveUp(this)" class="text">${list[i].text}</span>
                    <div class="icons" style="display: flex; justify-content: space-between; padding: 5px; max-width: 160px; width: 100%;">
                        <div name="Blue"><i class="fa fa-circle" style="color:blue" onclick="update_color(this)" aria-hidden="true"></i></div>
                        <div name="Pink"><i class="fa fa-circle" style="color:pink" onclick="update_color(this)" aria-hidden="true"></i></div>
                        <div name='Yellow'><i class="fa fa-circle" style="color:yellow" onclick="update_color(this)" aria-hidden="true"></i></div>
                        <div><i class="fa fa-bars"></i></div>
                        <div><i class="fa fa-hand-paper-o" title="Изменить заметку" onclick="update(this)" aria-hidden="true"></i></div>
                        <div><i class="fa fa-window-close" title="Удалить заметку" onclick="delete_el(this)"  aria-hidden="true"></i></div>
                    </div>
                </div>
            `
            wrapper_body.innerHTML += item
        }
    })
}

builtToDo()

const new_todo = $(".new_todo")[0]
const new_todo_input = $('.new_todo_input')[0]
const new_todo_title = $('.new_todo_title')[0]
const csrf = document.getElementsByName('csrfmiddlewaretoken')

var activeItem = null

new_todo.addEventListener('click', function(e){
    e.preventDefault()
    var url = 'http://127.0.0.1:8000/api/todo/list/'
    if (activeItem != null){
        var url = `http://127.0.0.1:8000/api/todo/list/${activeItem}/`
        var data = {"name": new_todo_title.value, "text": new_todo_input.value}
        activeItem = null
        $.ajax({
            type: 'PATCH',
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrf[0].value,
            },
            success: function (response) {
                new_todo_title.value = ''
                new_todo_input.value = ''
                builtToDo()
            },
            error: function (response) {
                console.log(response)
        }
    })
    }
    else{
        var data = {"name": new_todo_title.value, "text": new_todo_input.value}
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrf[0].value,
            },
            success: function (response) {
                builtToDo()
            },
            error: function (response) {
                console.log(response)
            }
        })
    }

})

function update_color(el){
    const color = el.parentNode.getAttribute("name")
    var id = el.parentNode.parentNode.parentNode.id
    activeItem = id
    var url = `http://127.0.0.1:8000/api/todo/list/${activeItem}/`
    var data = {"color": color}
        $.ajax({
            type: 'PATCH',
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrf[0].value,
            },
            success: function (response) {
                builtToDo()
            },
            error: function (response) {
                console.log(response)
            }
        })

}

function update(el){
    var id = el.parentNode.parentNode.id
    activeItem = id
    var url = `http://127.0.0.1:8000/api/todo/list/${id}/`
    new_todo_title.value = el.parentNode.previousElementSibling.title
    new_todo_input.value = el.parentNode.previousElementSibling.innerHTML
    var data = {"name": new_todo_title.value, "text": new_todo_input.value}

//    $.ajax({
//        type: 'PATCH',
//        url: url,
//        data: JSON.stringify(data),
//        dataType: "json",
//        headers: {
//            'Content-type': 'application/json',
//            'X-CSRFToken': csrf[0].value,
//        },
//        success: function (response) {
//            builtToDo()
//        },
//        error: function (response) {
//            console.log(response)
//        }
//    })

}

function delete_el(el){
    var id = el.parentNode.parentNode.id
    var url = `http://127.0.0.1:8000/api/todo/list/${id}/`
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: "json",
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrf[0].value,
        },
        success: function (response) {
            builtToDo()
        },
        error: function (response) {
            console.log(response)
        }
    })

}

function moveUp(el){
    var prev = document.querySelector('.item')
    prev.classList.remove('focused')
    el.classList.add('focused')
    run()
}


function run () {
  const items = document.querySelectorAll('.item')
  const focused = [...items].find(i => i.classList.contains('focused'))
  focused.parentNode.prepend(focused)
//  const previous = focused.previousElementSibling
//  console.log(previous)
//  const next = focused.nextElementSibling
//
//  focused.classList.remove('focused')
//  next.classList.add('focused')
//  // добавляет в конец
//  previous.parentNode.appendChild(previous)


}
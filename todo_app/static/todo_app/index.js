function builtToDo(){
    var wrapper_body = document.getElementById('wrapper')
//    var url = 'http://127.0.0.1:8000/api/todo/list/'
      var url = 'https://taskitransition7.herokuapp.com/api/todo/list/'
    wrapper_body.innerHTML = ''
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data.length > 0){
            var list = data
            for (var i in list){
                if (list[i].image !== null){
                    var item = `
                            <div class="item" id="${list[i].id}" style="background: ${list[i].color}"><span title="${list[i].name}" data-image="${list[i].image}" onclick="moveUp(this)" class="item-text">${list[i].text}</span>
                                <div class="icons" style="display: flex; justify-content: space-between; padding: 5px; max-width: 160px; width: 100%;">
                                    <div name="#008B8B"><i class="fa fa-circle" style="color:blue" onclick="update_color(this)" aria-hidden="true"></i></div>
                                    <div name="#FF1493"><i class="fa fa-circle" style="color:pink" onclick="update_color(this)" aria-hidden="true"></i></div>
                                    <div name='#ff9218'><i class="fa fa-circle" style="color:yellow" onclick="update_color(this)" aria-hidden="true"></i></div>
                                    <div><i data-bs-toggle="modal" onclick="change_modal(this)" data-bs-target="#exampleModal" class="fa fa-bars"></i></div>
                                    <div><i class="fa fa-hand-paper-o" title="Изменить заметку" onclick="update(this)" aria-hidden="true"></i></div>
                                    <div><i class="fa fa-window-close" title="Удалить заметку" onclick="delete_el(this)"  aria-hidden="true"></i></div>
                                </div>
                            </div>
                        `
                }
                else{
                    var item = `
                        <div class="item" id="${list[i].id}" style="background: ${list[i].color}">
                            <span title="${list[i].name}" onclick="moveUp(this)" class="item-text">${list[i].text}</span>
                            <div class="icons" style="display: flex; justify-content: space-between; padding: 5px; max-width: 160px; width: 100%;">
                                <div name="#008B8B"><i class="fa fa-circle" style="color:blue" onclick="update_color(this)" aria-hidden="true"></i></div>
                                <div name="#FF1493"><i class="fa fa-circle" style="color:pink" onclick="update_color(this)" aria-hidden="true"></i></div>
                                <div name='#ff9218'><i class="fa fa-circle" style="color:yellow" onclick="update_color(this)" aria-hidden="true"></i></div>
                                <div><i data-bs-toggle="modal" onclick="change_modal(this)" data-bs-target="#exampleModal" class="fa fa-bars"></i></div>
                                <div><i class="fa fa-hand-paper-o" title="Изменить заметку" onclick="update(this)" aria-hidden="true"></i></div>
                                <div><i class="fa fa-window-close" title="Удалить заметку" onclick="delete_el(this)"  aria-hidden="true"></i></div>
                            </div>
                        </div>
                    `
                }

                    wrapper_body.innerHTML += item
            }
        }
        else{
            wrapper_body.innerHTML = `<div>Заметок нет</div>`
        }

    })
}

builtToDo()

const new_todo = $(".new_todo")[0]
const new_todo_input = $('.new_todo_input')[0]
const new_todo_title = $('.new_todo_title')[0]
const save_all_button = $('.save_all_button')[0]
const delete_all_button = $('.delete_all_button')[0]
const csrf = document.getElementsByName('csrfmiddlewaretoken')

var activeItem = null

new_todo.addEventListener('click', function(e){
    e.preventDefault()
//    var url = 'http://127.0.0.1:8000/api/todo/list/'
    var url = `https://taskitransition7.herokuapp.com/api/todo/list/`
    if (activeItem != null){
//        var url = `http://127.0.0.1:8000/api/todo/list/${activeItem}/`
          var url = `https://taskitransition7.herokuapp.com/api/todo/list/${activeItem}/`
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
                new_todo_title.value = ''
                new_todo_input.value = ''
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
//    var url = `http://127.0.0.1:8000/api/todo/list/${activeItem}/`
    var url = `https://taskitransition7.herokuapp.com/api/todo/list/${activeItem}/`
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
      var id = el.parentNode.parentNode.parentNode.id
      activeItem = id
      new_todo_title.value = el.parentNode.parentNode.previousElementSibling.title
      new_todo_input.value = el.parentNode.parentNode.previousElementSibling.innerHTML
}

function delete_el(el){
    var id = el.parentNode.parentNode.parentNode.id
//    var url = `http://127.0.0.1:8000/api/todo/list/${id}/`
    var url = `https://taskitransition7.herokuapp.com/api/todo/list/${id}/`
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
      var prev_focused = document.querySelector('.focused')
      if (prev_focused !== null){
          prev_focused.classList.remove('focused')
      }
      el.classList.add('focused')
      run()
}


function run () {
  const items = document.querySelectorAll('.item-text')
  const focused = [...items].find(i => i.classList.contains('focused'))
  focused.parentNode.parentNode.prepend(focused.parentNode)

}

var modal_body = document.getElementById('modal-body')

function change_modal(el){
    var title_todo = el.parentNode.parentNode.previousElementSibling.title
    var text_todo = el.parentNode.parentNode.previousElementSibling.innerHTML
    var data_image = el.parentNode.parentNode.previousElementSibling.getAttribute('data-image')
    var id_todo = el.parentNode.parentNode.parentNode.id
//    var url = `http://127.0.0.1:8000/upload_image/${id_todo}/`
    var url = `https://taskitransition7.herokuapp.com/upload_image/${id_todo}/`

    var form = $(".image_form")
    form[0].action = `upload_image/${id_todo}/`
    if (data_image !== null){
        var correct_static = data_image.substr(45)
        console.log(correct_static)
        modal_body.innerHTML = `<div class="h5 mb-3" data-id="${id_todo}">Заметка</div>
            <div class="text-muted">
                <ul>
                    <li>Текст заметки: <b>${text_todo}</b></li>
                    <li>
                     <image src="{% static '${correct_static}' %}" width="250" height="150" alt="К заметке не прикреплена картинка"></image></li>
                </ul>
            </div>
            `
    }
    else{
        modal_body.innerHTML = `
        <div class="h5 mb-3" data-id="${id_todo}">Заметка</div><div class="text-muted">
                <ul>
                    <li>Текст заметки: <b>${text_todo}</b></li>
                    <li>Нет картинки</li>
                </ul>
            </div>
            `
    }
        $("#exampleModalLabel").html(title_todo)
}

save_all_button.addEventListener('click', function(e){
    e.preventDefault()
    var items = [...document.querySelector('.wrapper').children]
    for (var i in items){
        var id = items[i].id
//        var url = `http://127.0.0.1:8000/api/todo/list/${id}/`
        var url = `https://taskitransition7.herokuapp.com/api/todo/list/${id}/`

        var data = {"index": i}
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
                console.log(response)
            },
            error: function (response) {
                console.log(response)
            }
        })

    }

})

delete_all_button.addEventListener('click', function(e){
    var items = [...document.querySelector('.wrapper').children]
    for (var i in items){
        var id = items[i].id
//            var url = `http://127.0.0.1:8000/api/todo/list/${id}/`
            var url = `https://taskitransition7.herokuapp.com/api/todo/list/${id}/`
            $.ajax({
                type: 'DELETE',
                url: url,
                dataType: "json",
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrf[0].value,
                },
                success: function (response) {

                },
                error: function (response) {
                    console.log(response)
                }
            })
        }
        window.location.href = 'https://taskitransition7.herokuapp.com'

})
let ask = document.getElementById('ask')
let option = document.getElementById('option')
let jawaban = document.getElementById('jawaban')
let timer = document.getElementById('timer')
let next = document.getElementById('next')
let current = document.getElementById('currentscore')
let judge = document.getElementById('judge')
let currentscore = 0
let myscore = 0

function doRequest() {
    ask.innerHTML = ''
    option.innerText = ''
    timer.innerText = ''
    jawaban.innerHTML = ''
    judge.innerHTML = ''
    current.style.display = 'none'
    judge.style.display = 'none'
    next.style.display = 'none'
    ask.classList.add('fa-pulse')
    ask.classList.add('fa-spinner')
    let ajax = new XMLHttpRequest()
    ajax.open('GET', 'https://opentdb.com/api.php?amount=1&category=9&type=boolean', true)
    ajax.send()
    ajax.onreadystatechange = function (res) {
        res = JSON.parse(this.responseText).results[0]
        showIt(res)
    }
}

function showIt(res) {
    ask.classList.remove('fa-spinner')
    ask.classList.remove('fa-pulse')
    ask.innerHTML = ''
    option.innerText = ''


    let question = res.question
    console.log(question)
    ask.innerText = question.replace(/&quot;/g, '"').replace(/&#039;s/g, "'s").replace(/&#34;/g, '"').replace(/&#039;t/, "'t").replace(/&#039;/, "'")

    let jawabanbetul = res.correct_answer
    let jawabansalah = [...res.incorrect_answers]
    let pilihanjawaban = [jawabanbetul, ...jawabansalah]
    console.log(pilihanjawaban)
    let finalpilihan = pilihanjawaban.sort(function () { return 0.5 - Math.random() })
    console.log(finalpilihan)

    let btn
    finalpilihan.forEach(element => {
        btn = document.createElement('button')
        btn.innerText = element
        btn.classList.add('button')
        btn.setAttribute("id", "btn")
        btn.onclick = function () {
            let btnn = document.getElementsByClassName('button')
            for (let i = 0; i < btnn.length; i++) {
                btnn[i].disabled = true
            }
            if (element == jawabanbetul) {
                judge.innerHTML = "Youre right!"
                myscore += 1
                console.log(myscore)
                current.innerText = "My current score is " + myscore
                next.style.backgroundColor = '#499F68'
            }
            else {
                judge.innerHTML = "Youre wrong!"
                current.innerText = "My current score is " + myscore
                next.style.backgroundColor = '#B4654A'
            }
        }
        btn.value = element
        option.append(btn)
    });

    let down = 8
    let otherinterval = setInterval(() => {
        down--
        jawaban.innerHTML = 'The Asnwer revealed in : ' + down
        if (down <= 0) {
            clearInterval(otherinterval)
            jawaban.innerHTML = "The Answer is " + JSON.stringify(res.correct_answer)
            judge.style.display = 'block'
            current.style.display = 'block'
            document.getElementById('next').style.display = 'block'
        }
    }, 1000);
}
doRequest()
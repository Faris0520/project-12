var word,
	sound,
	results,
	word_name,
	defs = ``,
	finding = document.querySelector('.finding'),
	kata = document.querySelector('.kata'),
	box_teks = document.querySelector('.box_teks');

function find() {
	word = box_teks.value.trim()
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then((response) => {
			return response.json()
		})
		.then((res) => {
			results = res
			for (let i in results[0].meanings) {
				defs += `<li class="def">
							<h4>Part of Speech - ${results[0].meanings[i].partOfSpeech}</h4>
							<h4> </h4>
                            <p>Meaning:
                            <br>${results[0].meanings[i].definitions[0].definition}</br></p>
							<span>Example:<br>"${results[0].meanings[i].definitions[0].example}"</br></span>
						</li>`
			}
			render_this = /*html*/ `
			<div class="word">
				<button class="sound"
				onclick="pronunce('${results[0].phonetics[0].audio}')">
					${results[0].phonetics[0].text}
					<i class="fas fa-volume-up"></i>
				</button>
				<h2>${word}</h2>
				<ol class="text">
					${defs}
				</ol>
			</div>`
			kata.insertAdjacentHTML('afterbegin', render_this)
		})
		.catch((error) => {
			console.log(error)
		})
}

function pronunce(voice) {
	voice = new Audio(voice)
	voice.play()
}

box_teks.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		find()
		box_teks.value = '';
		defs = '';
	}
})


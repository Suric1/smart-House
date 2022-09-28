const dom = {
	selectbox: document.getElementById('selectbox'),
	selectboxList: document.querySelector('.selectbox__list'),
	rooms: document.getElementById('rooms'),
	settings: document.getElementById('settings'),
	settingsTabs: document.getElementById('settings-tabs'),
	settingsPanel: document.getElementById('settings-panel'),
	temperatureLine: document.getElementById('temperature-line'),
	temperatureRound: document.getElementById('temperature-round'),
	temperature: document.getElementById('temperature'),
	temperatureBtn: document.getElementById('temperature-btn')
}

//  Выпадающий список

dom.selectbox.querySelector('.selectbox__selected').onclick = (event) => {
	dom.selectbox.classList.toggle('open');
};

document.body.onclick = (event) => {
	const {target} = event;
	if (
		!target.matches('.selectbox') &&
		!target.parentElement.matches('.selectbox') &&
		!target.parentElement.parentElement.matches('.selectbox')
	) {
		dom.selectbox.classList.remove('open');
	}
};

dom.selectboxList.onclick = (event) => {
	const {target} = event;
	if (target.matches('.selectbox__item')) {
		const {room} = target.dataset;
		const selectedItem = dom.selectboxList.querySelector('.selected');
		selectedItem.classList.remove('selected');
		target.classList.add('selected');
		dom.selectbox.classList.remove('open');
		selectRoom(room);
	}
};
const rooms = {
	all: 'Все комнаты',
	livingroom: 'Зал',
	bedroom: 'Спальня',
	kitchen: 'Кухня',
	bathroom: 'Ванная',
	studio: 'Кабинет',
	washingroom: 'Уборная',
};

// Выбор комнаты

function selectRoom(room) {
	const selectedRoom = dom.rooms.querySelector('.selected');
	if (selectedRoom) {
		selectedRoom.classList.remove('selected');
	}
	if (room !== 'all') {
		const newSelectedRoom = dom.rooms.querySelector(`[data-room=${room}]`);
		newSelectedRoom.classList.add('selected');
		renderScreen(false);
	} else {
		renderScreen(true);
	}
	const selectedSelectboxRoom = dom.selectbox.querySelector(
		'.selectbox__item.selected'
	);
	selectedSelectboxRoom.classList.remove('selected');
	const newSelectedItem = dom.selectbox.querySelector(`[data-room=${room}]`);
	newSelectedItem.classList.add('selected');
	const selectboxSelected = dom.selectbox.querySelector(
		'.selectbox__selected  span'
	);
	selectboxSelected.innerHTML = rooms[room];
}

// Клик по элементу комнаты

dom.rooms.querySelectorAll('.room').forEach((room) => {
	room.onclick = (event) => {
		const value = room.dataset.room;
		selectRoom(value);
	};
});

// Отображение нужного экрана

function renderScreen(isRooms) {
	setTimeout(() => {
		if (isRooms) {
			dom.rooms.style.display = 'grid';
			dom.settings.style.display = 'none'
		} else {
			dom.rooms.style.display = 'none';
			dom.settings.style.display = 'block'
		}
	}, 300);
}

// Панель Настроек Комнаты

const settingsData = {
	all: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
	livingroom: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
	bedroom: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
	kitchen: {
		temperature: 0,
		lights: 0,
		humidity: 0,
	},
	bathroom: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
	studio: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
	washingroom: {
		temperature: 0,
		lights: 0,
		humidity: 0
	},
}

// Отрисовка температуры
function renderTemperature() {
	const min = 16
	const max = 40
	const range = max - min
	const percent = range / 100
	const lineMin = 54
	const lineMax = 276
	const lineRange = lineMax - lineMin
	const linePercent = lineRange / 100
	const roundMin = -240
	const roundMax = 48
	const roundRange = roundMax - roundMin
	const roundPercent = roundRange / 100
	
	
	if (temperature >= min && temperature <= max) {
		const finishPercent = Math.round((temperature - min) / percent)
		const lineFinishPercent = linePercent * finishPercent
		const roundFinishPercent = roundPercent * finishPercent
		dom.temperatureLine.style.strokeDasharray = `${lineFinishPercent} 276`
		dom.temperatureLine.style.transform = `rotate${roundFinishPercent} deg`
		dom.temperature.innerText = temperature
	}
}

renderTemperature(30)

// Изменение температуры


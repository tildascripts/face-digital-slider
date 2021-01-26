$(document).ready(() => {
	class Slider {
		constructor({
			rootEl,
			slides,
			nextButtonEl,
		}) {
			this.rootEl = rootEl
			this.nextButtonEl = nextButtonEl
			this.slides = slides
			this.slidesLength = slides.length
			this.styleToken = `c${Math.random().toString(32).replace(".", "")}`
			this.currentSlide = 0
		}

		injectStyle() {
			const style = document.createElement("style")
			style.innerHTML = `
				.slide-${this.styleToken} {
					position: absolute;
					left: 0;
					top: 0;
					width: 300px;
					height: 126px;
					transition: all .3s ease-out;
					display: none;
				}
				.sildeText-${this.styleToken} {
					position:absolute;
					left: 0;
					top: 0;
					width: 138px;
					transform: rotate(-90deg) translateX(-100%);
					transform-origin: left top;
					text-align: center;
					font-size: 16px;
					font-family: "Montserrat", Arial, sans-serif;
					color: #181718;
					text-decoration: underline;
				}
				.image-${this.styleToken} {
					position:absolute;
					top: 0;
					left: 42px;
					width: 84px;
					height: 84px;
				}
				.place-${this.styleToken} {
					position:absolute;
					top: 24px;
					left: 42px;
					width: 84px;
					text-align: center;
					font-size: 24px;
					font-weight: 300;
					font-family: "Montserrat", Arial, sans-serif;
					color: rgba(24, 23, 24, 1);
				}
				.text-${this.styleToken} {
					position:absolute;
					left: 42px;
					bottom: 0;
					width: 258px;
					font-size: 14px;
					color: #181718;
					font-family: "Montserrat", Arial, sans-serif;
				}
				.year-${this.styleToken} {
					position:absolute;
					left: 178px;
					top: 2px;
					font-weight: 700;
					font-size: 16px;
					color: #181718;
					font-family: "Montserrat", Arial, sans-serif;
				}
			`
			document.head.appendChild(style)
		}

		createSlide(slideData) {
			const slide = document.createElement("div")
			slide.setAttribute("class", `slide-${this.styleToken}`)

			const image = document.createElement("img")
			image.setAttribute("src", slideData.image)
			image.setAttribute("class", `image-${this.styleToken}`)

			const text = document.createElement("div")
			text.innerHTML = slideData.text
			text.setAttribute("class", `text-${this.styleToken}`)
			if (slideData.bottom) {
				text.style.bottom = slideData.bottom
			}

			if (slideData.place) {
				const place = document.createElement("div")
				place.innerHTML = slideData.place
				place.setAttribute("class", `place-${this.styleToken}`)
			    slide.appendChild(place)
			}
            
            if (slideData.sildeText) {
    			const link = document.createElement("a")
    			link.setAttribute("href", slideData.href)
    			if (slideData.href.indexOf("http") >= 0) {
    				link.setAttribute("target", "_blank")
    			}
    
    			const sildeText = document.createElement("div")
    			sildeText.innerHTML = slideData.sildeText
    			sildeText.setAttribute("class", `sildeText-${this.styleToken}`)
			    
			    link.appendChild(sildeText)
			    slide.appendChild(link)
            }

			const year = document.createElement("div")
			year.innerHTML = slideData.year
			year.setAttribute("class", `year-${this.styleToken}`)

			slide.appendChild(image)
			slide.appendChild(text)
			slide.appendChild(year)
			return slide
		}

		getSlideByIndex(index) {
			return index - (Math.floor(index / this.slidesLength) * this.slidesLength)
		}

		next() {
			const currentSlideEl = this.slides[this.getSlideByIndex(this.currentSlide)].slideEl
			currentSlideEl.style.zIndex = 1
			currentSlideEl.style.transform = "translateX(-15px)"
			currentSlideEl.style.opacity = 0

			const nextSlideEl = this.slides[this.getSlideByIndex(this.currentSlide + 1)].slideEl
			nextSlideEl.style.zIndex = 2
			nextSlideEl.style.display = "block"
			nextSlideEl.style.transform = "translateX(15px)"
			nextSlideEl.style.opacity = 0

			setTimeout(() => {
				nextSlideEl.style.transform = "translateX(0px)"
				nextSlideEl.style.opacity = 1
			}, 1)

			setTimeout(() => {
				currentSlideEl.style.display = "none"
			}, 300)

			this.currentSlide++
		}

		init() {
			this.injectStyle()
			this.rootEl.innerHTML = ""
			this.slides = this.slides.map((item, index) => {
				const slideEl = this.createSlide(item)
				if (index === 0) {
					slideEl.style.display = "block"
				}
				else {
					slideEl.style.display = "none"
				}
				this.rootEl.appendChild(slideEl)
				return Object.assign({}, item, {slideEl: slideEl})
			})
			this.nextButtonEl.addEventListener("click", () => this.next())
		}
	}

	const slidesData = [
	{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />верхний ценовой сегмент",
			year: 2020,
			place: 14,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:2",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />зоотовары",
			year: 2020,
			place: 5,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:1",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />Центральный ФО",
			year: 2020,
			place: 18,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:3",
		},
		{
			sildeText: "awwwards",
			text: "приз<br />special mention",
			year: 2016,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			href: "https://www.awwwards.com/sites/bokov-design-studio-1",
		},
		{
			text: "performance<br />соревнование<br />ConvertBattle",
			year: 2017,
			place: 1,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />одежда, обувь",
			year: 2020,
			place: 18,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:4",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />Россия",
			year: 2020,
			place: 35,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:5",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />Косметика и парфюмерия",
			year: 2019,
			place: 6,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:6",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />верхний ценовой сегмент",
			year: 2019,
			place: 33,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:7",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />косметика и парфюмерия",
			year: 2018,
			place: 3,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:8",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />одежда и обувь",
			year: 2019,
			place: 13,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:9",
		},
		{
			sildeText: "рейтинг рунета",
			text: "разработчики<br />интернет-магазинов,<br />верхний ценовой сегмент",
			year: 2019,
			place: 13,
			image: "https://i.ibb.co/8P9wvsg/image-1.png",
			bottom: "-17px",
			href: "#popup:10",
		},
	]
	const sliderInstance = new Slider({
		rootEl: document.querySelector("[data-elem-id='1611245739452']"),
		nextButtonEl: document.querySelector("[data-elem-id='1611240044489']"),
		slides: slidesData,
	})
	sliderInstance.init()
})
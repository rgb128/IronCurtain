'use strict'

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nihil minus, contraque illa hereditate dives ob eamque rem laetus. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Qui potest igitur habitare in beata vita summi mali metus? Possumusne ergo in vita summum bonum dicere, cum id ne in cena quidem posse videamur? Ergo, si semel tristior effectus est, hilara vita amissa est? Ut optime, secundum naturam affectum esse possit. Duo Reges: constructio interrete. An hoc usque quaque, aliter in vita?';
const PAGE_WIDTH = 2048;
const PAGE_HEIGHT = 2048;
const LETTER_WIDTH = 128;
const LETTER_HEIGHT = 128;
const LETTERS_COUNT = 256;
const COLORS = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'black',
];
const main = document.getElementById('main');
const SVG_NS = 'http://www.w3.org/2000/svg';
const SAME_LETTER_SHIFT = 10;
const STROKE_WIDTH = 10;
const LETTER_SCALE = 1.8;


function randomInt(a, b) {
    if (b <= a) {
        throw new Error("b must be greater than a");
    }
    return Math.floor(Math.random() * (b - a) + a);
}
function getColor() {
    return COLORS[randomInt(0, COLORS.length)];
}
function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}

function getRealText(length = LETTERS_COUNT, noSpaces = true) {
    let start, end;

    do {
        start = randomInt(0, text.length - length + 1);
        end = start + length;
    } while (noSpaces && (text[start] === ' ' || text[end - 1] === ' '));

    return text.slice(start, end);
}


function generatePage() {
    main.innerHTML = '';
    const realText = getRealText(LETTERS_COUNT);
    console.log(realText);
    for (let i = 0; i < LETTERS_COUNT; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letterContainer');
        // letterDiv.style.backgroundColor = getColor();

        for (let j = -1; j < 2; j++) {
            const letterSvg = document.createElementNS(SVG_NS, 'svg');
            letterSvg.classList.add('letterSvg');
            letterSvg.style.top = SAME_LETTER_SHIFT * j + 'px';
            letterSvg.style.left = SAME_LETTER_SHIFT * j + 'px';
            // letterSvg.setAttributeNS(SVG_NS, 'viewBox', '0 0 100 100');
            // letterSvg.setAttributeNS(SVG_NS, 'preserveAspectRatio', 'xMidYMid slice');
            letterSvg.setAttribute('viewBox', '0 0 100 100');
            letterSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

            const letterText = document.createElementNS(SVG_NS, 'text');
            letterSvg.style.transform = `rotate(${map(Math.random(), 0, 1, -10, 10)}deg) scale(${LETTER_SCALE})`;
            // letterText.setAttributeNS(SVG_NS, 'x', '50%');
            // letterText.setAttributeNS(SVG_NS, 'y', '50%');
            // const color = getColor();
            // letterText.setAttributeNS(SVG_NS, 'fill', color);
            // letterText.setAttributeNS(SVG_NS, 'stroke', color);
            // letterText.setAttributeNS(SVG_NS, 'stroke-width', STROKE_WIDTH);
            // letterText.setAttributeNS(SVG_NS, 'font-family', 'Noto Sans');
            // letterText.setAttributeNS(SVG_NS, 'font-size', 100);
            // letterText.setAttributeNS(SVG_NS, 'font-weight', 800);
            // letterText.setAttributeNS(SVG_NS, 'text-anchor', 'middle');
            // letterText.setAttributeNS(SVG_NS, 'dominant-baseline', 'middle');

            letterText.setAttribute('x', '50%');
            letterText.setAttribute('y', '50%');
            const color = getColor();
            letterText.setAttribute('fill', color);
            letterText.setAttribute('stroke', color);
            letterText.setAttribute('stroke-width', STROKE_WIDTH);
            letterText.setAttribute('font-family', 'Noto Sans');
            letterText.setAttribute('font-size', 100);
            letterText.setAttribute('font-weight', 800);
            letterText.setAttribute('text-anchor', 'middle');
            letterText.setAttribute('dominant-baseline', 'middle');
            letterText.style.zIndex = randomInt(1, 512);

            letterText.innerHTML = Math.random() < .5 ? realText[i].toLowerCase() : realText[i].toUpperCase();
            // letterText.innerText = realText[i];
            letterSvg.appendChild(letterText);
            letterDiv.appendChild(letterSvg);
        }

        main.appendChild(letterDiv);
    }
}

generatePage();

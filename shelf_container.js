'use strict';

const e = React.createElement;

var characters = ['Bayonetta', 'Bowser Jr', 'Bowser', 'Captain Falcon', 'Charizard', 'Chrom', 'Cloud', 'Corrin - Male', 'CR-chibirobo', 'Daisy', 'Dark Pit', 'Dark Samus', 'Diddy Kong', 'Donkey Kong', 'Dr', 'Duck Hunt', 'Falco', 'FE-chrom', 'FE-tiki', 'Fox', 'Game _ Watch', 'Ganondorf', 'Greninja', 'Ice Climbers', 'Ike', 'Inkling', 'Ivysaur', 'Jigglypuff', 'King Dedede', 'King K', 'kirby-WaddleDee', 'Kirby', 'Link-SSBU', 'Link', 'Little Mac', 'Lucario', 'Lucas', 'Lucina', 'Luigi', 'Mario', 'Marth', 'Mega Man', 'Meta Knight', 'Mewtwo', 'Mii Brawler', 'Mii Gunner', 'Mii Swordfighter', 'MSR-metroid', 'MSR-samus', 'Ness', 'Olimar', 'Pac-Man', 'Palutena', 'Peach', 'Pichu', 'PIK-pikmin', 'Pikachu', 'Pit', 'Pokemon Trainer', 'R', 'Richter', 'Ridley', 'Robin - Male', 'ROBOT - NES', 'Rosalina _ Luma', 'Rosalina-', 'Roy', 'Ryu', 'Samus', 'Sheik', 'Shulk', 'Simon', 'SM-boo', 'SM-daisy', 'SM-goomba', 'SM-koopa', 'SM-mario-Gold', 'SM-mario-Silver', 'SM-toad', 'SM-waluigi', 'Snake(1)', 'Snake', 'Sonic', 'splat-boy-2', 'splat-boy-violet', 'splat-boy', 'splat-girl-2', 'splat-girl-green', 'splat-girl', 'splat-green-ENG', 'splat-pink-ENG', 'splat-squid-2', 'splat-squid-oran', 'splat-squid', 'Squirtle', 'Toon Link', 'Villager', 'Wario', 'Wii Fit Trainer', 'Wolf',  'Yoshi', 'Young Link', 'YWW-blu', 'YWW-green', 'YWW-pink', 'YWW-poochy', 'Z-botw-daruk', 'Z-botw-mipha', 'Z-botw-revali', 'Z-botw-urbosa', 'Zelda-SSBU', 'Zelda', 'Zero Suit Samus']
var char_options = []
for (let c of characters) {
    char_options.push(e('option', {value: c}, c));
}

function tr(content) {
    return e('tr', [], content)
}
function td(content) {
    return e('td', [], content)
}

function table(content) {
    return e('table', [], e('tbody', [], content));
}

function make_rows(items) {
    var rows = [];
    for (let r of items) {
        rows.push(tr(td(r)));
    }
    return rows;
}

class Amiibo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { character: "Bayonetta" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({character: event.target.value});
    }

    render() {
        var img_name = "images/" + this.state.character + ".png";
        var img = e('img', {src: img_name, height: 200});
        var selector = e('select', {onChange: this.handleChange}, char_options);
        var container = table(make_rows([img, selector]));
        return container;
    }
}

class ShelfBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: "#333333"};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({color: event.target.value});
    }

    render() {
        var styling = {height: "30px", backgroundColor: this.state.color};
        var row_props = {style: styling, colSpan: 4};
        var row = e('td', row_props);
        var input = td(e('input', {type: "text", value: this.state.color, onChange: this.handleChange}));
        return [row, input];
    }
}

class Shelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amiibo: [e(Amiibo),e(Amiibo),e(Amiibo),e(Amiibo)],
                        base: e(ShelfBase)};
    }

    render() {
        var am = [];
        for (let a of this.state.amiibo) {
            am.push(td(a));
        }
        return table([tr(am), tr(this.state.base)]);
    }
}

class ShelfContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shelves: [e(Shelf),e(Shelf),e(Shelf),e(Shelf)]};
    }

    render() {
        var sh = [];
        for (let s of this.state.shelves) {
            sh.push(tr(td(s)));
        }
        return table(sh);
    }
}

const domContainer = document.querySelector('#shelf_container');
ReactDOM.render(e(ShelfContainer), domContainer);

'use strict';

const e = React.createElement;

var characters = ['Alm', 'Bayonetta', 'Boo', 'Bowser Jr', 'Bowser', 'Captain Falcon', 'Celica', 'Charizard', 'Chibi Robo', 'Chrom', 'Cloud', 'Corrin (Female)', 'Corrin (Male)', 'Daisy (Super Mario)', 'Daisy', 'Dark Pit', 'Dark Samus', 'Diddy Kong', 'Donkey Kong', 'Dr Mario', 'Duck Hunt', 'Falco', 'Fox', 'Game and Watch', 'Ganondorf', 'Goomba', 'Greninja', 'Ice Climbers', 'Ike', 'Inkling', 'Ivysaur', 'Jigglypuff', 'King Dedede', 'King K Rool', 'kirby-WaddleDee', 'Kirby', 'Link (Adult)', 'Link (BOTW)', 'Little Mac', 'Lucario', 'Lucas', 'Lucina', 'Luigi', 'Mario (Gold)', 'Mario (Silver)', 'Mario', 'Marth', 'Mega Man', 'Meta Knight', 'Mewtwo', 'Mii Brawler', 'Mii Gunner', 'Mii Swordfighter', 'Ness', 'Olimar', 'Pac-Man', 'Palutena', 'Peach', 'Pichu', 'PIK-pikmin', 'Pikachu', 'Pit', 'Pokemon Trainer', 'Richter', 'Ridley', 'ROB', 'Robin (Male)', 'Rosalina', 'Roy', 'Ryu', 'Samus', 'Sheik', 'Shulk', 'Simon', 'SM-koopa', 'Snake', 'Sonic', 'splat-boy-2', 'splat-boy-violet', 'splat-boy', 'splat-girl-2', 'splat-girl-green', 'splat-girl', 'splat-green-ENG', 'splat-pink-ENG', 'splat-squid-2', 'splat-squid-oran', 'splat-squid', 'Squirtle', 'Toad', 'Toon Link', 'Villager', 'Waluigi', 'Wario', 'Wii Fit Trainer', 'Wolf', 'Yoshi', 'Young Link', 'YWW-blu', 'YWW-green', 'YWW-pink', 'YWW-poochy', 'Z-botw-daruk', 'Z-botw-mipha', 'Z-botw-revali', 'Z-botw-urbosa', 'Zelda-SSBU', 'Zelda', 'Zero Suit Samus']
var char_options = []
for (var i = 0; i < characters.length; i++) {
    var c = characters[i];
    char_options.push(e('option', {value: c, key: i}, c));
}

function tr(content, params) {
    return e('tr', params, content)
}
function td(content, params) {
    return e('td', params, content)
}

function table(content, t_params, tb_params) {
    return e('table', t_params, e('tbody', tb_params, content));
}

function make_rows(items) {
    var rows = [];
    for (var i = 0; i < items.length; i++) {
        rows.push(tr(td(items[i], {key: "td"+i}), {key: "tr"+i}));
    }
    return rows;
}

class Amiibo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { character: characters[0] };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({character: event.target.value});
    }

    render() {
        var img_name = "images/" + this.state.character + ".png";
        var img = e('img', {src: img_name, height: 200, key: "img"});
        var selector = e('select', {onChange: this.handleChange, key: "char_selector"}, char_options);
        var container = table(make_rows([img, selector]),{key: "atable"},{key: "atbody"});
        return container;
    }
}

class ShelfBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: "#000000"};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({color: event.target.value});
    }

    render() {
        var styling = {height: "30px", backgroundColor: this.state.color};
        var row_props = {style: styling, colSpan: this.props.len, key: "base-td"};
        var row = e('td', row_props);
        var input = td(e('input', {type: "text", value: this.state.color, onChange: this.handleChange, key: "color-picker"}), {key: "colortd"});
        return [row, input];
    }
}

class Shelf extends React.Component {
    constructor(props) {
        super(props);
        var amiibo = [0,1,2,3].map((n) => e(Amiibo, {key: n}));
        this.state = {amiibo: amiibo};

        this.addAmiibo = this.addAmiibo.bind(this);
        this.removeAmiibo = this.removeAmiibo.bind(this);
    }

    addAmiibo() {
        var am = this.state.amiibo;
        am.push(e(Amiibo, {key: am.length}));
        this.setState({amiibo: am});
    }

    removeAmiibo() {
        var am = this.state.amiibo;
        am.pop();
        this.setState({amiibo: am});
    }

    render() {
        var am = [];
        for (var i = 0; i < this.state.amiibo.length; i++) {
            am.push(td(this.state.amiibo[i], {key: i}));
        }
        var addButton = e('button', {onClick: this.addAmiibo, key: "add"}, "+");
        var removeButton = e('button', {onClick: this.removeAmiibo, key: "rem"}, "-");
        am.push(td([removeButton, addButton], {key: "buttons"}));
        return table([tr(am, {key: "amiibo"}), tr(e(ShelfBase, {key: "shelfbase", len: this.state.amiibo.length}), {key: "base"})], {key: "tb"}, {key: "tbod"});
    }
}

class ShelfContainer extends React.Component {
    constructor(props) {
        super(props);
        var shelves = [0,1,2,3].map((n) => e(Shelf, {key: n}));
        this.state = {shelves: shelves};
    }

    render() {
        var sh = [];
        for (var i = 0; i < this.state.shelves.length; i++) {
            sh.push(tr(td(this.state.shelves[i], {key: "td"+i}), {key: "tr"+i}));
        }
        return table(sh, {key: "table"}, {key: "tbody"});
    }
}

const domContainer = document.querySelector('#shelf_container');
ReactDOM.render(e(ShelfContainer, {key: "container"}), domContainer);

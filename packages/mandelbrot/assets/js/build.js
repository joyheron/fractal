'use strict';

global.jQuery    = require('jquery');
const pjax       = require('jquery-pjax');
const $          = global.jQuery;
const doc        = $(document);

const events     = require('./events');
const utils      = require('./utils');
const framer     = require('./components/frame');
const Tree       = require('./components/tree');
const Pen        = require('./components/pen');

const resizeable = require('jquery-resizable-dom/dist/jquery-resizable.js');

loadPen();

global.fractal = {
    events: events
};

const frame     = framer($('#frame'));
const navTrees  = $.map($('[data-behaviour="tree"]'), t => new Tree(t));
let pens        = [];

doc.pjax('a[data-pjax]', '#pjax-container', {
    fragment: '#pjax-container',
    timeout: 10000
}).on('pjax:start', function(e, xhr, options){
    if (utils.isSmallScreen()) {
        mainFrame.closeSidebar();
    }
    frame.startLoad();
    events.trigger('main-content-preload', options.url);
}).on('pjax:end', function(){
    events.trigger('main-content-loaded');
    frame.endLoad();
});

events.on('main-content-loaded', loadPen);

function loadPen(){
    pens = $.map($('[data-behaviour="pen"]'), p => new Pen(p));
}
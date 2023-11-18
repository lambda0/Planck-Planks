window.addEventListener('keydown', function(event) {
    let controlDown = event.ctrlKey || event.metaKey;
    let shiftDown = event.shiftKey;
    const tmp = event.keyCode;
    switch (tmp) {
        case 48:
            maxPlankGenerators(9);
            break;
        case 49:
            maxPlankGenerators(0);
            break;
        case 50:
            maxPlankGenerators(1);
            break;
        case 51:
            maxPlankGenerators(2);
            break;
        case 52:
            maxPlankGenerators(3);
            break;
        case 53:
            maxPlankGenerators(4);
            break;
        case 54:
            maxPlankGenerators(5);
            break;
        case 55:
            maxPlankGenerators(6);
            break;
        case 56:
            maxPlankGenerators(7);
            break;
        case 57:
            maxPlankGenerators(8);
            break;
        case 77:
            maxAllPlankGenerators();
            break;
    }
}, false);
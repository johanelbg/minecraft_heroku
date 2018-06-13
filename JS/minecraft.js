
//display modal on loading
$(window).on('load', function () {
    $('#myModal').modal('show');

    //loading the page...
    $('#startButton').click(function () {
        $('#myModal').modal('hide')
        $('.loading').css('display', 'flex')

        setTimeout(function () {
            $('.sideBar').css('display', 'flex');
            $('.loading').css('display', 'none');
            minecraftGame.init();
        }, 2000);
    });

    $('#instrucButton').click(function () {
        $('#exampleModalLong').modal('show');
    })
});

var minecraftGame = {};

minecraftGame.init = function () {
    minecraftGame.tileSys();
    minecraftGame.layout();
};

minecraftGame.layout = function () {  //Creates a 2D array with a method that takes the coordinates of a cell of the array, and returns its value. Then dynamically generates a div for each cell.
    var map = {
        cols: 66,
        rows: 15,
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9],
            [0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 9, 9, 9],
            [0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 1, 2, 1, 0, 5, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 9, 9, 9],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        getTile: function (col, row) {
            return this.tiles[col][row]
        },
    }

    for (var c = 0; c < map.rows; c++) {
        for (var r = 0; r < map.cols; r++) {
            var tile = map.getTile(c, r);
            if (tile == 0) {  //tile returns the value of the cell that has c and r as coordinates.
                var divEmpty = $("<div/>");
                divEmpty.addClass('divEmpty'); //add a style to cells according to their value
                $('#bigBox').append(divEmpty);
            } else if (tile == 1) {
                var divGround = $("<div/>");
                divGround.addClass('divGround');
                $('#bigBox').append(divGround);
            } else if (tile == 2) {
                var divWood = $("<div/>");
                divWood.addClass('divWood');
                $('#bigBox').append(divWood);
            } else if (tile == 3) {
                var divLeaf = $("<div/>");
                divLeaf.addClass('divLeaf');
                $('#bigBox').append(divLeaf);
            } else if (tile == 4) {
                var divCloud = $("<div/>");
                divCloud.addClass('divCloud');
                $('#bigBox').append(divCloud);
            } else if (tile == 5) {
                var divStone = $("<div/>");
                divStone.addClass('divStone');
                $('#bigBox').append(divStone);
            } else if (tile == 6) {
                var divGrass = $("<div/>");
                divGrass.addClass('divGrass');
                $('#bigBox').append(divGrass);
            } else if (tile == 7) {
                var divMinione = $("<div/>");
                divMinione.addClass('divMinione');
                $('#bigBox').append(divMinione);
            } else if (tile == 8) {
                var divMinion = $("<div/>");
                divMinion.addClass('divMinion');
                $('#bigBox').append(divMinion);
            } else if (tile == 9) {
                var divNotInUse = $("<div/>");
                divNotInUse.addClass('divNotInUse');
                $('#bigBox').append(divNotInUse);
            }
        }
    }

    // We randomize the location of the mystery tile so every time the user plays the game the tile will be on another location
    listMistery = document.querySelectorAll(".divEmpty");
    random = Math.floor(Math.random() * listMistery.length);
    listMistery[random].classList.remove("divEmpty");
    listMistery[random].classList.add("divMinione");

};

var list;
var counter = 0;
var tileType = 0;
var index;
var that;
var indexMistery;
var listMistery;
var random;
var listVictory;
var indexVictory;
var aviramCounter =0;
var breakSound = new Audio('./sounds/break.mp3');
var grassSound = new Audio('./sounds/grass.mp3');
var stoneSound = new Audio('./sounds/stone.mp3');
var woodSound = new Audio('./sounds/wood.mp3');
var groundSound = new Audio('./sounds/ground.mp3');
var cloudSound = new Audio('./sounds/breath.mp3');
var toolSound = new Audio('./sounds/tool.mp3');
var step = new Audio('./sounds/step.mp3');
var lostSong = new Audio('./sounds/lostSong.mp3');
var isLostSong = new Audio('./sounds/isLostSong.mp3');
var aviramSong = new Audio('./sounds/AVIRAMSONG.mp3');
var listAviram;
var indexAviram;
var indexMinione;

minecraftGame.tileSys = function () {



    $('.resetButton').click(function () {
        location.reload();
    });

    $("#toTheRight").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if (list[that + 1].className == "divEmpty" && list[that + 67].className !== "divEmpty") {
                    moveRight(that);
                }
                if (list[that + 1].className == "divEmpty" && list[that + 67].className == "divEmpty" && list[that + 133].className == "divEmpty" && list[that + 199].className == "divEmpty") {
                    // Here there are more than 3 empty tiles under the minion, so we want it to fall down using setTimeout functions to make it fall progressively and then die

                    suddenDeathRight(that);
                }
                break;
            }
        }
        victory();
    });

    $("#toTheLeft").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if (list[that - 1].className == "divEmpty" && list[that + 65].className !== "divEmpty") {
                    moveLeft(that);
                }
                if (list[that - 1].className == "divEmpty" && list[that + 131].className == "divEmpty" && list[that + 197].className == "divEmpty") {

                    suddenDeathLeft(that);
                }
                break;
            }
        }
        victory();
    });

    $("#toTheTopLeft").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if ((list[that - 1].className == "divStone" || list[that - 1].className == "divGrass" || list[that - 1].className == "divGround" || list[that - 1].className == "divWood") && list[that - 67].className == "divEmpty") {
                    topLeft(that);
                }
                break;
            }
        }
        victory();
    });

    $("#toTheTopRight").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if ((list[that + 1].className == "divStone" || list[that + 1].className == "divGrass" || list[that + 1].className == "divGround" || list[that + 1].className == "divWood") && list[that - 65].className == "divEmpty") {
                    topRight(that);
                }
                break;
            }
        }
        victory();
    });

    $("#toTheBottomRight").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if (list[that + 1].className == "divEmpty" && list[that + 67].className == "divEmpty" && (list[that + 133].className == "divStone" || list[that + 133].className == "divGrass" || list[that + 133].className == "divGround") || list[that + 133].className == "divWood") {
                    bottomRight(that);
                }
                break;
            }
        }
        victory();
    });

    $("#toTheBottomLeft").on("click", function () {
        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;
                if (list[that - 1].className == "divEmpty" && list[that + 65].className == "divEmpty" && (list[that + 131].className == "divStone" || list[that + 131].className == "divGrass" || list[that + 131].className == "divGround") || list[that + 131].className == "divWood") {
                    bottomLeft(that);
                }
                break;
            }
        }           //il manque      break
        victory();
    });

    $("#tutorialBox").on("mouseover", function () { //hide the tutorial Div
        $("#tutorialBox").css('display', 'none')
    })

    $("#toolContainer0").on("click", function () {
        counter = 1;
        $("#toolContainer0").addClass("selectedTool");      //Add a red border to the tool the user selects inside the SideBar.
        $("#toolContainer1").removeClass("selectedTool");    //Remove red border to the tool the user selects inside the SideBar.
        $("#toolContainer2").removeClass("selectedTool");
        $("#toolContainer3").removeClass('selectedTool');
        $("#tileCreator").removeClass("selectedTileCreator");
        $("#tutorialBox").show();   // display a tutorial Div for each type of tool.
        $("#tutorialBox").text("Harvest wood and leaf ! Then use the wood to create bridges between stone tiles");
        toolSound.play();
        $('.divLeaf').on("click", function () {
            if (counter === 1) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divLeaf');
                $('.lastTile').removeClass('divStone divWood divCloud divGround divGrass')
                $('.lastTile').addClass('divLeaf')
                breakSound.play();
                tileType = 3;
            }
        })
        $('.divWood').on("click", function () {
            if (counter === 1) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divWood');
                $('.lastTile').removeClass('divStone divLeaf divCloud divGround divGrass')
                $('.lastTile').addClass('divWood')
                breakSound.play();
                tileType = 2;
            }
        })
    })

    $("#toolContainer1").on("click", function () {
        counter = 2;
        $("#toolContainer0").removeClass("selectedTool");
        $("#toolContainer1").addClass("selectedTool");
        $("#toolContainer2").removeClass("selectedTool");
        $("#toolContainer3").removeClass('selectedTool');
        $("#tileCreator").removeClass("selectedTileCreator");
        $("#tutorialBox").show();
        $("#tutorialBox").text("Mine stones! Stack them one by one to walk up a stone stair ");
        toolSound.play();
        $('.divStone').on("click", function () {
            if (counter === 2) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divStone');
                $('.lastTile').removeClass('divLeaf divWood divCloud divGround divGrass');
                $('.lastTile').addClass('divStone');
                breakSound.play();
                tileType = 5;
            }
        })
    })

    $("#toolContainer2").on("click", function () {
        counter = 3;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").addClass("selectedTool")
        $("#toolContainer3").removeClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $("#tutorialBox").show();
        $("#tutorialBox").text("Harvest ground and grass! Use them to build the surface ");
        toolSound.play();
        $('.divGrass').on("click", function () {
            if (counter === 3) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divGrass');
                $('.lastTile').removeClass('divLeaf divWood divCloud divGround divStone')
                $('.lastTile').addClass('divGrass')
                breakSound.play();
                tileType = 6;
            }
        })
        $('.divGround').on("click", function () {
            if (counter === 3) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divGround');
                $('.lastTile').removeClass('divStone divLeaf divCloud divWood divGrass')
                $('.lastTile').addClass('divGround')
                breakSound.play();
                tileType = 1;
            }
        })
    })

    $("#toolContainer3").on("click", function () {
        counter = 4;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").removeClass("selectedTool")
        $("#toolContainer3").addClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $("#tutorialBox").show();
        $("#tutorialBox").text("A cloud is standing in your way ? Call Bob !");
        toolSound.play();
        $('.divCloud').on("click", function () {
            if (counter === 4) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divCloud');
                $('.lastTile').removeClass('divLeaf divWood divGround divGrass divStone');
                $('.lastTile').addClass('divCloud');
                cloudSound.play();
                tileType = 4;
                aviramCounter++;
                aviram();

            }
        })
    })

    $(".lastTile").on("click", function () {
        counter = 5;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").removeClass("selectedTool")
        $("#tileCreator").addClass("selectedTileCreator")
        $("#tutorialBox").show();
        $("#tutorialBox").text("Build the world!");
        if (tileType == 1 || tileType == 2 || tileType == 3 || tileType == 4 || tileType == 5 || tileType == 6 || tileType == 7) {
            $('.divEmpty').on("click", function () {

                that = this; //Here we want to find the index of the div we want to put the element in
                list = document.querySelectorAll('div');
                for (var k = 0; k < list.length; k++) {
                    if (that == list[k]) {
                        index = k;
                    }
                    if (list[k].className == "divMinione") {
                        indexMistery = k;
                    }
                }
                // We want to put a new element in the matrix, we want to do it only if it is logical with our actual matrix. For example we don't want to user to be able to put a stone in the sky or above a tree
                if (counter == 5) {
                    if (tileType == 1 && list[index + 66].className == 'divGround') {
                        $(this).addClass('divGround');
                        $(this).removeClass('divLeaf divWood divStone divCloud divGrass divEmpty');
                        groundSound.play();
                    } if (tileType == 2 && (list[index + 66].className == 'divGrass' || list[index + 66].className == 'divWood')) {
                        $(this).addClass('divWood');
                        $(this).removeClass('divLeaf divGround divStone divCloud divGrass divEmpty');
                        woodSound.play();
                    } else if (tileType == 2 && (list[index + 1].className == 'divStone' || list[index - 1].className == 'divStone' || list[index + 1].className == 'divWood' || list[index - 1].className == 'divWood') && (list[index - 66].className == 'divEmpty' && list[index + 66].className == 'divEmpty')) { // wood can be built as a bridge.
                        $(this).addClass('divWood');
                        $(this).removeClass('divLeaf divGround divStone divCloud divGrass divEmpty');
                        woodSound.play();
                    }
                    if (tileType == 3 && (list[index + 66].className == 'divWood' || list[index + 1].className == 'divLeaf' || list[index - 66].className == 'divLeaf' || list[index - 1].className == 'divLeaf' || list[index + 66].className == 'divLeaf')) {
                        $(this).addClass('divLeaf');
                        $(this).removeClass('divWood divGround divStone divCloud divGrass divEmpty');
                        grassSound.play();
                    } if (tileType == 4 && list[index].className == 'divEmpty') {
                        $(this).addClass('divCloud');
                        $(this).removeClass('divWood divStone divLeaf divGrass divGround divEmpty');
                        cloudSound.play();
                    }
                    if (tileType == 5 && list[index].className == 'divEmpty' && (list[index + 66].className == 'divGrass' || list[index + 66].className == 'divStone')) {
                        $(this).addClass('divStone');
                        $(this).removeClass('divWood divGround divLeaf divCloud divGrass divEmpty');
                        stoneSound.play();
                    }

                    if (tileType == 6 && list[index + 66].className == 'divGround') {
                        $(this).addClass('divGrass');
                        $(this).removeClass('divWood divStone divLeaf divCloud divGround divEmpty');
                        grassSound.play();
                    }
                }
            })
        }
    });

};

// We need to locate the mystery tile -the minione- in the matrix to check if the minion is standing next to it
function victory() {
    // Here we want to select all the tiles, not only the ones which are empty
    listVictory = document.querySelectorAll('div');
    for (var k = 0; k < listVictory.length; k++) {

        if (listVictory[k].className == "divMinione") {
            indexVictory = k;
        }
    } //Next if loop : Whenever the minion is located next to the the mystery tile, then the mystery tile shows up.
    if (listVictory[indexVictory + 1].className == 'divMinion' || listVictory[indexVictory - 1].className == 'divMinion') {
        $(".divMinione").addClass('victoryTile');
        $(".divMinione").removeClass('.divMinione');
        $(".victoryTile").on("click", function () { //clicking on the Mystery tile will change it into the Victory Tile, which is the unique condition to win this game.
            $("#tutorialBox").css('display', 'none');
            var finalSong = new Audio('victorySong.mp3');
            $('#finalModal').modal('show');
            finalSong.play();

            $('.resetButton').on("click", function () {
                location.reload();
            });
        });
    }

}

function resetAfterDefeat() {
    location.reload();
};


function moveRight(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index + 1].classList.add("divMinion");
    list[index + 1].classList.remove("divEmpty");
    step.play();
}

function moveLeft(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index - 1].classList.add("divMinion");
    list[index - 1].classList.remove("divEmpty");
    step.play();
}

function topLeft(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index - 67].classList.add("divMinion");
    list[index - 67].classList.remove("divEmpty");
    step.play();
}

function topRight(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index - 65].classList.add("divMinion");
    list[index - 65].classList.remove("divEmpty");
    step.play();
}

function bottomLeft(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index + 65].classList.add("divMinion");
    list[index + 65].classList.remove("divEmpty");
    step.play();
}

function bottomRight(index) {
    list[index].classList.add("divEmpty");
    list[index].classList.remove("divMinion");
    list[index + 67].classList.add("divMinion");
    list[index + 67].classList.remove("divEmpty");
    step.play();
}




function suddenDeathRight(index) {

    setTimeout(function () {
        lostSong.play();
        list[index].classList.add("divEmpty");
        list[index].classList.remove("divMinion");
        list[index + 1].classList.add("divMinion");
        setTimeout(function () {
            list[index + 133].classList.add("divMinion");
            list[index + 1].classList.remove("divMinion");
            setTimeout(function () {
                list[index + 133].classList.remove("divMinion");
                list[index + 199].classList.add("divMinion");
                list[index + 67].classList.remove("divMinion");
                setTimeout(function () {
                    isLostSong.play();
                    $(".divMinion").css("background-image", "url('https://cdn.shopify.com/s/files/1/0822/1983/articles/tombstone-pixel-art-pixel-art-tombstone-halloween-rip-cemetery-pixel-8bit_large.png?v=1501229231')")
                    setTimeout(function () {
                        $("#sideBar").css('display', 'none');
                        $("#isLostBigBox").css('display', 'inline');
                        $("#tutorialBox").css('display', 'none')
                    }, 2000);
                }, 500);
            }, 500);
        }, 500);
    }, 200);
}

function suddenDeathLeft(index) {
    setTimeout(function () {
        lostSong.play();
        list[index].classList.add("divEmpty");
        list[index].classList.remove("divMinion");
        list[index - 1].classList.add("divMinion");
        setTimeout(function () {
            list[index + 131].classList.add("divMinion");
            list[index - 1].classList.remove("divMinion");
            setTimeout(function () {
                list[index + 131].classList.remove("divMinion");
                list[index + 197].classList.add("divMinion");
                list[index - 65].classList.remove("divMinion");
                setTimeout(function () {
                    isLostSong.play();
                    $("#sideBar").css('display', 'none');
                    $(".divMinion").css("background-image", "url('https://cdn.shopify.com/s/files/1/0822/1983/articles/tombstone-pixel-art-pixel-art-tombstone-halloween-rip-cemetery-pixel-8bit_large.png?v=1501229231')")
                    setTimeout(function () {
                        $("#isLostBigBox").css('display', 'inline');
                        $("#sideBar").css('display', 'none');
                        $("#tutorialBox").css('display', 'none')
                    }, 2000);
                }, 500);
            }, 500);
        }, 500);
    }, 200);
}

function aviram() {

    listAviram = document.querySelectorAll('div');
    for (var k = 0; k < listAviram.length; k++) {
        if (listAviram[k].className == "divMinion") {
            indexAviram = k;
        }
        if (listAviram[k].className == "divMinione") {
            indexMinione = k;
        }
    }
    if (aviramCounter == 5) {
        $("#tutorialBox").css("display", 'inline');
        $("#tutorialBox").text("WWOWOWOWO AVIRAM WILL TELEPORT YOU TO YOUR SOULMATE ");
        listAviram[indexAviram+2].classList.add("divAviram");
        aviramSong.play();
        setTimeout(function () {
            listAviram[indexAviram+2].classList.remove("divAviram");
            listAviram[indexAviram+1].classList.add("divAviram");
            setTimeout(function () {
                listAviram[indexAviram+1].classList.remove("divAviram");
                listAviram[indexAviram].classList.remove("divMinion");
                listAviram[indexAviram].classList.add("divEmpty");
                listAviram[indexMinione+1].classList.add("divMinion");
                listAviram[indexMinione-1].classList.add("divAviram");

                $(".divMinione").addClass('victoryTile');
                $(".divMinione").removeClass('.divMinione');
                $(".victoryTile").on("click", function () { //clicking on the Mystery tile will change it into the Victory Tile, which is the unique condition to win this game.
                    $("#tutorialBox").css('display', 'none');
                    var finalSong = new Audio('./sounds/victorySong.mp3');
                    $('#finalModal').modal('show');
                    aviramSong.pause();
                    finalSong.play();

                    $('.resetButton').on("click", function () {
                        location.reload();
                    });
                });
            }, 1200);
        }, 1500)


    }

}

'use strict';

// Sources
// https://i.imgur.com/jBPnlPT.png
// https://rankedboost.com/zelda-breath-of-the-wild/armor-upgrades/
// Colour scheme help - https://coolors.co/737765-007ea8-9b5c43-007388-394141

// Array.from polyfil.
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

var app = function () {
  var armor = [{
    name: "Champion's Tunic",
    pieces: [{ type: "Chest", y: 16, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Silent Princess", qty: 3 }], [{ name: "Silent Princess", qty: 3 }, { name: "Shard of Farosh's Horn", qty: 2 }], [{ name: "Silent Princess", qty: 3 }, { name: "Shard of Naydra's Horn", qty: 2 }], [{ name: "Silent Princess", qty: 10 }, { name: "Shard of Dinraal's Horn", qty: 2 }]]
  }, {
    name: "Hylian Set",
    pieces: [{ type: "Head", y: 0, x: 0 }, { type: "Chest", y: 0, x: 0 }, { type: "Leg", y: 0, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Bokoblin Horn", qty: 5 }], [{ name: "Bokoblin Horn", qty: 8 }, { name: "Bokoblin Fang", qty: 5 }], [{ name: "Bokoblin Guts", qty: 5 }, { name: "Bokoblin Fang", qty: 10 }], [{ name: "Bokoblin Guts", qty: 15 }, { name: "Amber", qty: 15 }]]
  }, {
    name: "Soldier's Set",
    pieces: [{ type: "Head", y: 9, x: 0 }, { type: "Chest", y: 9, x: 0 }, { type: "Leg", y: 9, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Chuchu Jelly", qty: 5 }, { name: "Bokoblin Guts", qty: 3 }], [{ name: "Keese Eyeball", qty: 3 }, { name: "Moblin Guts", qty: 3 }], [{ name: "Lizalfos Tail", qty: 3 }, { name: "Hinox Guts", qty: 1 }], //Fixed, reddit. Hat is 2,2...
    [{ name: "Lynel Hoof", qty: 2 }, { name: "Lynel Guts", qty: 2 }]]
  }, {
    name: "Snowquill Set",
    pieces: [{ type: "Head", y: 4, x: 0 }, { type: "Chest", y: 4, x: 0 }, { type: "Leg", y: 4, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Red Chuchu Jelly", qty: 3 }], [{ name: "Red Chuchu Jelly", qty: 5 }, { name: "Warm Safflina", qty: 3 }], [{ name: "Fire Keese Wing", qty: 8 }, { name: "Sunshroom", qty: 5 }], [{ name: "Red Lizalfos Tail", qty: 10 }, { name: "Ruby", qty: 5 }]]
  }, {
    name: "Desert Voe Set",
    pieces: [{ type: "Head", y: 3, x: 0 }, { type: "Chest", y: 3, x: 0 }, { type: "Leg", y: 3, x: 0 }],
    checked: true,
    upgrades: [[{ name: "White Chuchu Jelly", qty: 3 }], [{ name: "White Chuchu Jelly", qty: 5 }, { name: "Ice Keese Wing", qty: 3 }], [{ name: "Icy Lizalfos Tail", qty: 3 }, { name: "Ice Keese Wing", qty: 8 }], [{ name: "Icy Lizalfos Tail", qty: 10 }, { name: "Sapphire", qty: 5 }]]
  }, {
    name: "Rubber Set",
    pieces: [{ type: "Head", y: 11, x: 0 }, { type: "Chest", y: 13, x: 0 }, { type: "Leg", y: 12, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Yellow Chuchu Jelly", qty: 3 }], [{ name: "Yellow Chuchu Jelly", qty: 5 }, { name: "Voltfruit", qty: 5 }], [{ name: "Yellow Lizalfos Tail", qty: 5 }, { name: "Zapshroom", qty: 5 }], [{ name: "Yellow Lizalfos Tail", qty: 10 }, { name: "Topaz", qty: 10 }]]
  }, {
    name: "Flamebreaker Set",
    pieces: [{ type: "Head", y: 5, x: 0 }, { type: "Chest", y: 5, x: 0 }, { type: "Leg", y: 5, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Fireproof Lizard", qty: 1 }, { name: "Moblin Horn", qty: 2 }], [{ name: "Fireproof Lizard", qty: 3 }, { name: "Moblin Fang", qty: 4 }], [{ name: "Smotherwing Butterfly", qty: 3 }, { name: "Moblin Guts", qty: 3 }], [{ name: "Smotherwing Butterfly", qty: 5 }, { name: "Hinox Guts", qty: 2 }]]
  }, {
    name: "Zora Set",
    pieces: [{ type: "Head", y: 2, x: 0 }, { type: "Chest", y: 2, x: 0 }, { type: "Leg", y: 2, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Lizalfos Horn", qty: 3 }], [{ name: "Lizalfos Talon", qty: 5 }, { name: "Hyrule Bass", qty: 5 }], [{ name: "Lizalfos Tail", qty: 5 }, { name: "Hearty Bass", qty: 5 }], [{ name: "Lizalfos Tail", qty: 10 }, { name: "Opal", qty: 15 }]]
  }, {
    name: "Sheikah's Stealth Set",
    pieces: [{ type: "Head", y: 6, x: 0 }, { type: "Chest", y: 6, x: 0 }, { type: "Leg", y: 6, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Blue Nightshade", qty: 3 }], [{ name: "Blue Nightshade", qty: 5 }, { name: "Sunset Firefly", qty: 5 }], [{ name: "Silent Shroom", qty: 8 }, { name: "Sneaky River Snail", qty: 5 }], [{ name: "Silent Princess", qty: 5 }, { name: "Stealthfin Trout", qty: 10 }]]
  }, {
    name: "Climbing Set",
    pieces: [{ type: "Head", y: 7, x: 0 }, { type: "Chest", y: 7, x: 0 }, { type: "Leg", y: 7, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Keese Wing", qty: 3 }, { name: "Rushroom", qty: 3 }], [{ name: "Electric Keese Wing", qty: 5 }, { name: "Hightail Lizard", qty: 5 }], [{ name: "Ice Keese Wing", qty: 5 }, { name: "Hot-Footed Frog", qty: 10 }], [{ name: "Fire Keese Wing", qty: 5 }, { name: "Swift Violet", qty: 15 }]]
  }, {
    name: "Barbarian Set",
    pieces: [{ type: "Head", y: 12, x: 0 }, { type: "Chest", y: 14, x: 0 }, { type: "Leg", y: 13, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Lynel Horn", qty: 1 }], [{ name: "Lynel Horn", qty: 3 }, { name: "Lynel Hoof", qty: 2 }], [{ name: "Lynel Guts", qty: 1 }, { name: "Lynel Hoof", qty: 4 }], [{ name: "Lynel Guts", qty: 2 }, { name: "Dragon Horns*", qty: 1 }]],
    individual: {
      t1Head: [{ name: "Lynel Horn", qty: 1 }],
      t1Chest: [{ name: "Lynel Horn", qty: 1 }],
      t1Leg: [{ name: "Lynel Horn", qty: 1 }],
      t2Head: [{ name: "Lynel Horn", qty: 3 }, { name: "Lynel Hoof", qty: 2 }],
      t2Chest: [{ name: "Lynel Horn", qty: 3 }, { name: "Lynel Hoof", qty: 2 }],
      t2Leg: [{ name: "Lynel Horn", qty: 3 }, { name: "Lynel Hoof", qty: 2 }],
      t3Head: [{ name: "Lynel Guts", qty: 1 }, { name: "Lynel Hoof", qty: 8 }],
      t3Chest: [{ name: "Lynel Guts", qty: 1 }, { name: "Lynel Hoof", qty: 8 }],
      t3Leg: [{ name: "Lynel Guts", qty: 1 }, { name: "Lynel Hoof", qty: 8 }],
      t4Head: [{ name: "Lynel Guts", qty: 2 }, { name: "Shard of Dinraal's Horn", qty: 1 }],
      t4Chest: [{ name: "Lynel Guts", qty: 2 }, { name: "Shard of Farosh's Horn", qty: 1 }],
      t4Leg: [{ name: "Lynel Guts", qty: 2 }, { name: "Shard of Naydra's Horn", qty: 1 }]
    }
  }, {
    name: "Radiant Set",
    pieces: [{ type: "Head", y: 8, x: 0 }, { type: "Chest", y: 8, x: 0 }, { type: "Leg", y: 8, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Luminous Stone", qty: 5 }, { name: "Bokoblin Guts", qty: 3 }], [{ name: "Luminous Stone", qty: 8 }, { name: "Moblin Guts", qty: 3 }], [{ name: "Luminous Stone", qty: 10 }, { name: "Molduga Guts", qty: 2 }], [{ name: "Luminous Stone", qty: 20 }, { name: "Lynel Guts", qty: 1 }]]
  }, {
    name: "Ancient Set",
    pieces: [{ type: "Head", y: 10, x: 0 }, { type: "Chest", y: 10, x: 0 }, { type: "Leg", y: 10, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Ancient Spring", qty: 5 }, { name: "Ancient Screw", qty: 5 }], [{ name: "Ancient Spring", qty: 15 }, { name: "Ancient Gear", qty: 10 }], [{ name: "Ancient Shaft", qty: 15 }, { name: "Ancient Core", qty: 5 }], [{ name: "Giant Ancient Core", qty: 2 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Armor of the Wild Set",
    pieces: [{ type: "Head", y: 1, x: 0 }, { type: "Chest", y: 1, x: 0 }, { type: "Leg", y: 1, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Acorn", qty: 10 }, { name: "Dragon Scales*", qty: 2 }], [{ name: "Courser Bee Honey", qty: 5 }, { name: "Dragon Claws*", qty: 2 }], [{ name: "Energetic Rhino Beetle", qty: 5 }, { name: "Dragon Fangs*", qty: 2 }], [{ name: "Star Fragment", qty: 1 }, { name: "Dragon Horns*", qty: 2 }]],
    individual: {
      t1Head: [{ name: "Acorn", qty: 10 }, { name: "Farosh's Scale", qty: 2 }],
      t1Chest: [{ name: "Acorn", qty: 10 }, { name: "Naydra's Scale", qty: 2 }],
      t1Leg: [{ name: "Acorn", qty: 10 }, { name: "Dinraal's Scale", qty: 2 }],
      t2Head: [{ name: "Courser Bee Honey", qty: 5 }, { name: "Farosh's Claw", qty: 2 }],
      t2Chest: [{ name: "Courser Bee Honey", qty: 5 }, { name: "Naydra's Claw", qty: 2 }],
      t2Leg: [{ name: "Courser Bee Honey", qty: 5 }, { name: "Dinraal's Claw", qty: 2 }],
      t3Head: [{ name: "Energetic Rhino Beetle", qty: 5 }, { name: "Shard of Farosh's Fang", qty: 2 }],
      t3Chest: [{ name: "Energetic Rhino Beetle", qty: 5 }, { name: "Shard of Naydra's Fang", qty: 2 }],
      t3Leg: [{ name: "Energetic Rhino Beetle", qty: 5 }, { name: "Shard of Dinraal's Fang", qty: 2 }],
      t4Head: [{ name: "Star Fragment", qty: 1 }, { name: "Shard of Farosh's Horn", qty: 2 }],
      t4Chest: [{ name: "Star Fragment", qty: 1 }, { name: "Shard of Naydra's Horn", qty: 2 }],
      t4Leg: [{ name: "Star Fragment", qty: 1 }, { name: "Shard of Dinraal's Horn", qty: 2 }]
    }
  }, {
    name: "Sand Boots",
    pieces: [{ type: "Leg", y: 14, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Molduga Fin", qty: 5 }, { name: "Hightail Lizard", qty: 10 }], [{ name: "Molduga Fin", qty: 10 }, { name: "Swift Carrot", qty: 10 }], [{ name: "Molduga Guts", qty: 2 }, { name: "Rushroom", qty: 15 }], [{ name: "Molduga Guts", qty: 4 }, { name: "Swift Violet", qty: 15 }]]
  }, {
    name: "Snow Boots",
    pieces: [{ type: "Leg", y: 18, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Octorok Tentacle", qty: 5 }, { name: "Hightail Lizard", qty: 10 }], [{ name: "Octo Balloon", qty: 5 }, { name: "Swift Carrot", qty: 10 }], [{ name: "Octorok Eyeball", qty: 5 }, { name: "Rushroom", qty: 15 }], [{ name: "Naydra's Scale", qty: 2 }, { name: "Swift Violet", qty: 15 }]]
  }, {
    name: "Amber Earrings",
    pieces: [{ type: "Head", y: 15, x: 5 }],
    checked: true,
    upgrades: [[{ name: "Amber", qty: 5 }, { name: "Flint", qty: 3 }], [{ name: "Amber", qty: 10 }, { name: "Flint", qty: 3 }], [{ name: "Amber", qty: 20 }, { name: "Flint", qty: 3 }], [{ name: "Amber", qty: 30 }, { name: "Flint", qty: 3 }]]
  }, {
    name: "Opal Earrings",
    pieces: [{ type: "Head", y: 15, x: 4 }],
    checked: true,
    upgrades: [[{ name: "Opal", qty: 5 }, { name: "Flint", qty: 3 }], [{ name: "Opal", qty: 8 }, { name: "Flint", qty: 3 }], [{ name: "Opal", qty: 16 }, { name: "Flint", qty: 3 }], [{ name: "Opal", qty: 20 }, { name: "Flint", qty: 3 }]]
  }, {
    name: "Diamond Circlet",
    pieces: [{ type: "Head", y: 15, x: 0 }],
    checked: true,
    upgrades: [[{ name: "Diamond", qty: 2 }, { name: "Flint", qty: 3 }], [{ name: "Diamond", qty: 4 }, { name: "Flint", qty: 3 }], [{ name: "Diamond", qty: 6 }, { name: "Star Fragment", qty: 1 }], [{ name: "Diamond", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Ruby Circlet",
    pieces: [{ type: "Head", y: 15, x: 1 }],
    checked: true,
    upgrades: [[{ name: "Ruby", qty: 2 }, { name: "Flint", qty: 3 }], [{ name: "Ruby", qty: 4 }, { name: "Flint", qty: 3 }], [{ name: "Ruby", qty: 6 }, { name: "Star Fragment", qty: 1 }], [{ name: "Ruby", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Sapphire Circlet",
    pieces: [{ type: "Head", y: 15, x: 2 }],
    checked: true,
    upgrades: [[{ name: "Sapphire", qty: 2 }, { name: "Flint", qty: 3 }], [{ name: "Sapphire", qty: 4 }, { name: "Flint", qty: 3 }], [{ name: "Sapphire", qty: 6 }, { name: "Star Fragment", qty: 1 }], [{ name: "Sapphire", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Topaz Earrings",
    pieces: [{ type: "Head", y: 15, x: 3 }],
    checked: true,
    upgrades: [[{ name: "Topaz", qty: 2 }, { name: "Flint", qty: 3 }], [{ name: "Topaz", qty: 4 }, { name: "Flint", qty: 3 }], [{ name: "Topaz", qty: 6 }, { name: "Star Fragment", qty: 1 }], [{ name: "Topaz", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Sheik’s Mask (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 12 }],
    checked: false,
    upgrades: [[{ name: "Silent Princess", qty: 1 }, { name: "Star Fragment", qty: 1 }], [{ name: "Silent Princess", qty: 2 }, { name: "Star Fragment", qty: 2 }], [{ name: "Silent Princess", qty: 3 }, { name: "Star Fragment", qty: 3 }], [{ name: "Silent Princess", qty: 4 }, { name: "Star Fragment", qty: 4 }]]
  }, {
    name: "Hero Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 15 }, { type: "Chest", y: 16, x: 3 }, { type: "Leg", y: 0, x: 0 }],
    checked: false,
    upgrades: [[{ name: "Ruby", qty: 1 }, { name: "Star Fragment", qty: 1 }], [{ name: "Ruby", qty: 3 }, { name: "Star Fragment", qty: 1 }], [{ name: "Ruby", qty: 5 }, { name: "Star Fragment", qty: 1 }], [{ name: "Ruby", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Time Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 8 }, { type: "Chest", y: 16, x: 2 }, { type: "Leg", y: 14, x: 0 }],
    checked: false,
    upgrades: [[{ name: "Amber", qty: 3 }, { name: "Star Fragment", qty: 1 }], [{ name: "Amber", qty: 5 }, { name: "Star Fragment", qty: 1 }], [{ name: "Amber", qty: 15 }, { name: "Star Fragment", qty: 1 }], [{ name: "Amber", qty: 30 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Twilight Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 10 }, { type: "Chest", y: 16, x: 4 }, { type: "Leg", y: 0, x: 0 }],
    checked: false,
    upgrades: [[{ name: "Topaz", qty: 1 }, { name: "Star Fragment", qty: 1 }], [{ name: "Topaz", qty: 3 }, { name: "Star Fragment", qty: 1 }], [{ name: "Topaz", qty: 5 }, { name: "Star Fragment", qty: 1 }], [{ name: "Topaz", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Sky Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 9 }, { type: "Chest", y: 16, x: 5 }, { type: "Leg", y: 0, x: 0 }],
    checked: false,
    upgrades: [[{ name: "Sapphire", qty: 1 }, { name: "Star Fragment", qty: 1 }], [{ name: "Sapphire", qty: 3 }, { name: "Star Fragment", qty: 1 }], [{ name: "Sapphire", qty: 5 }, { name: "Star Fragment", qty: 1 }], [{ name: "Sapphire", qty: 10 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Wind Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 9 }, { type: "Chest", y: 16, x: 3 }, { type: "Leg", y: 17, x: 2 }],
    checked: false,
    upgrades: [[{ name: "Opal", qty: 3 }, { name: "Star Fragment", qty: 1 }], [{ name: "Opal", qty: 5 }, { name: "Star Fragment", qty: 1 }], [{ name: "Opal", qty: 10 }, { name: "Star Fragment", qty: 1 }], [{ name: "Opal", qty: 20 }, { name: "Star Fragment", qty: 1 }]]
  }, {
    name: "Fierce Diety Set (Amiibo)",
    pieces: [{ type: "Head", y: 14, x: 9 }, { type: "Chest", y: 16, x: 4 }, { type: "Leg", y: 0, x: 0 }],
    checked: false,
    upgrades: [[{ name: "Hinox Toenail", qty: 5 }, { name: "Dragon Scales*", qty: 1 }], [{ name: "Hinox Tooth", qty: 5 }, { name: "Dragon Claws*", qty: 1 }], [{ name: "Hinox Guts", qty: 2 }, { name: "Dragon Fangs*", qty: 1 }], [{ name: "Lynel Guts", qty: 2 }, { name: "Dragon Horns*", qty: 1 }]],
    individual: {
      t1Head: [{ name: "Hinox Toenail", qty: 5 }, { name: "Dinraal's Scale", qty: 1 }],
      t1Chest: [{ name: "Hinox Toenail", qty: 5 }, { name: "Naydra's Scale", qty: 1 }],
      t1Leg: [{ name: "Hinox Toenail", qty: 5 }, { name: "Farosh's Scale", qty: 1 }],
      t2Head: [{ name: "Hinox Tooth", qty: 5 }, { name: "Dinraal's Claw", qty: 1 }],
      t2Chest: [{ name: "Hinox Tooth", qty: 5 }, { name: "Naydra's Claw", qty: 1 }],
      t2Leg: [{ name: "Hinox Tooth", qty: 5 }, { name: "Farosh's Claw", qty: 1 }],
      t3Head: [{ name: "Hinox Guts", qty: 5 }, { name: "Shard of Dinraal's Fang", qty: 1 }],
      t3Chest: [{ name: "Hinox Guts", qty: 5 }, { name: "Shard of Naydra's Fang", qty: 1 }],
      t3Leg: [{ name: "Hinox Guts", qty: 5 }, { name: "Shard of Farosh's Fang", qty: 1 }],
      t4Head: [{ name: "Lynel Guts", qty: 5 }, { name: "Shard of Dinraal's Horn", qty: 1 }],
      t4Chest: [{ name: "Lynel Guts", qty: 5 }, { name: "Shard of Naydra's Horn", qty: 1 }],
      t4Leg: [{ name: "Lynel Guts", qty: 5 }, { name: "Shard of Farosh's Horn", qty: 1 }]
    }
  }];

  var checkBoxes = [];
  var canvases = [];
  var resultDisplay = "";
  var images = {};

  function loadImages() {
    var loadTrack = loaded(fillCanvases, 4); //Preload images. then init.

    function loaded(fn, goal) {
      var count = 0;

      return function () {
        count++;
        if (count === goal) {
          fn();
        }
      };
    }

    images["Head"] = new Image();
    images["Head"].onload = loadTrack;
    images["Head"].src = "http://volv.org/zelda/images/headItems.png";
    images["Chest"] = new Image();
    images["Chest"].onload = loadTrack;
    images["Chest"].src = "http://volv.org/zelda/images/chestItems.png";
    images["Leg"] = new Image();
    images["Leg"].onload = loadTrack;
    images["Leg"].src = "http://volv.org/zelda/images/legItems.png";
    images["check"] = new Image();
    images["check"].onload = loadTrack;
    images["check"].src = "http://volv.org/zelda/images/check.png";
  }

  //TODO - translate to React...
  function createSet(_ref) {
    var name = _ref.name;
    var pieces = _ref.pieces;
    var upgrades = _ref.upgrades;
    var checked = _ref.checked;
    var _ref$individual = _ref.individual;
    var individual = _ref$individual === undefined ? null : _ref$individual;

    var itemSet = document.createElement("div");
    var label = document.createElement("label");
    var labelSpan = document.createElement("span");
    var inclusionCheckboxDiv = document.createElement("div");
    var inclusionCheckbox = document.createElement("input");
    var toggleCheckbox = document.createElement("input");
    var tableDiv = document.createElement("div");
    var table = document.createElement("table");

    itemSet.setAttribute("class", "itemSet");
    label.setAttribute("class", "setHeader");
    label.setAttribute("for", name);
    labelSpan.setAttribute("class", "setFullName");
    labelSpan.innerHTML = name;

    inclusionCheckboxDiv.setAttribute("class", "setIncluded");
    inclusionCheckboxDiv.setAttribute("title", 'Include in Item Count\nRight Click/Long Press to Select/Deselect All');
    inclusionCheckboxDiv.appendChild(inclusionCheckbox);
    inclusionCheckbox.setAttribute("type", "checkbox");
    inclusionCheckbox.setAttribute("class", "inclusionCheckbox");
    inclusionCheckbox.checked = checked;

    toggleCheckbox.setAttribute("type", "checkbox");
    toggleCheckbox.setAttribute("class", "setToggle");
    toggleCheckbox.setAttribute("id", name);
    toggleCheckbox.checked = true;
    if (name === "Champion's Tunic") {
      toggleCheckbox.checked = false;
    }

    tableDiv.setAttribute("class", "setDetails");
    tableDiv.appendChild(table);
    table.innerHTML = '<tr><th>Tier 1</th><th>Tier 2</th><th>Tier 3</th><th>Tier 4</th></tr><tr>';

    var tr = document.createElement("tr");

    for (var i = 0; i < 4; i++) {
      var td = document.createElement("td");
      var p = document.createElement("p");
      p.setAttribute("class", "ingredients");
      if (individual === null || !individual['t' + (i + 1) + 'Head'][1]) {
        p.setAttribute("title", "Per Item");
      } else {
        var ingredientString = "";
        ingredientString += 'Head - ' + individual['t' + (i + 1) + 'Head'][1].name + '\n';
        ingredientString += 'Chest - ' + individual['t' + (i + 1) + 'Chest'][1].name + '\n';
        ingredientString += 'Leg - ' + individual['t' + (i + 1) + 'Leg'][1].name;
        p.setAttribute("title", ingredientString);
      }
      p.innerHTML = upgrades[i][0].name + ' x ' + upgrades[i][0].qty + '<br>'; //Here to 'fix' awkward armor
      p.innerHTML += upgrades[i][1] ? upgrades[i][1].name + ' x ' + upgrades[i][1].qty + '<br>' : '';
      td.appendChild(p);
      tr.appendChild(td);
    }

    table.appendChild(tr);

    tr = document.createElement("tr");

    for (var i = 0; i < 4; i++) {
      var td = document.createElement("td");

      for (var j = 0; j < pieces.length; j++) {
        var canvas = document.createElement("canvas");
        canvas.width = 48;
        canvas.height = 48;
        canvas.setAttribute("class", "item");
        canvas.setAttribute("alt", pieces[j].type);
        canvas.setAttribute("type", pieces[j].type);
        canvas.setAttribute("picX", pieces[j].x);
        canvas.setAttribute("picY", pieces[j].y);
        canvas["desc"] = name + ' - ' + pieces[j].type;
        canvas["set"] = '' + name;
        canvas["ticked"] = false;

        //Allowances for awkward upgrades..
        if (individual === null || !individual['t' + (i + 1) + 'Head'][1]) {
          canvas.setAttribute("title", pieces[j].type);
          canvas.upgrades = upgrades[i];
        } else {
          var ingredientString = '' + individual['t' + (i + 1) + pieces[j].type][1].name;
          canvas.setAttribute("title", ingredientString);
          canvas.upgrades = individual['t' + (i + 1) + pieces[j].type];
        }

        td.appendChild(canvas);
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);

    label.appendChild(labelSpan);
    label.appendChild(inclusionCheckboxDiv);

    itemSet.appendChild(label);
    itemSet.appendChild(toggleCheckbox);
    itemSet.appendChild(tableDiv);

    return itemSet;
  }

  function doRandomImages() {
    function rndItem(ctx) {
      var scale = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var type = arguments[2];

      var x = 0,
          y = 0,
          upper = 0;

      if (type === "Head") {
        y = Math.floor(Math.random() * 16);
        upper = y === 15 ? 5 : 16;
        x = Math.floor(Math.random() * upper);
      }

      if (type === "Chest") {
        y = Math.floor(Math.random() * 18);
        upper = y === 16 ? 8 : upper = y === 17 ? 1 : 16;
        x = Math.floor(Math.random() * upper);
      }

      if (type === "Leg") {
        y = Math.floor(Math.random() * 19);
        upper = y === 17 ? 8 : 16;
        x = Math.floor(Math.random() * upper);
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawItem(type, x, y, ctx, scale);
    }

    var randomHead = document.getElementById("randomHead");
    var randomChest = document.getElementById("randomChest");
    var randomLeg = document.getElementById("randomLeg");
    var randomHeadCTX = randomHead.getContext("2d");
    var randomChestCTX = randomChest.getContext("2d");
    var randomLegCTX = randomLeg.getContext("2d");
    randomHead.width = 96;randomHead.height = 96;
    randomChest.width = 96;randomChest.height = 96;
    randomLeg.width = 96;randomLeg.height = 96;
    setInterval(rndItem, 400, randomHeadCTX, 2, "Head");
    setInterval(rndItem, 500, randomChestCTX, 2, "Chest");
    setInterval(rndItem, 600, randomLegCTX, 2, "Leg");
  }

  function drawItem(type, x, y, ctx) {
    var scale = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];

    var xPos = 1 + 96 * x + x;
    var yPos = 1 + 96 * y + y;
    ctx.drawImage(images[type], xPos, yPos, 96, 96, 0, 0, 48 * scale, 48 * scale);
    if (ctx.canvas.ticked) {
      ctx.drawImage(images["check"], 20 * scale, 20 * scale, 22 * scale, 22 * scale);
    }
  }

  function drawFromItemList(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 48, 48);
    var type = canvas.getAttribute("type");
    var x = Number(canvas.getAttribute("picX"));
    var y = Number(canvas.getAttribute("picY"));
    drawItem(type, x, y, ctx);
  }

  function fillCanvases() {
    canvases.forEach(function (item) {
      if (item.getAttribute("class") === "item" && item.getAttribute("picX") !== null) {
        item.style.background = "none";
        drawFromItemList(item);
      }
    });
    doRandomImages(); // Start em going
    countMats(); // Initial Mat Count
  }

  function init() {
    var setList = document.getElementById("setList");
    var setList2 = document.getElementById("setList2");

    loadImages();

    for (var i = 0; i < armor.length; i++) {
      if (i < 14) {
        setList.appendChild(createSet(armor[i]));
      } else {
        setList2.appendChild(createSet(armor[i]));
      }
    }

    resultDisplay = document.getElementById("result");
    checkBoxes = Array.from(document.querySelectorAll("input[type=checkbox]"));
    canvases = Array.from(document.querySelectorAll("canvas"));

    window.addEventListener("click", function (event) {
      if (event.button !== 2) {
        toggleTick(event);
      }
      countMats();
      doSave();
    });

    //Right click / long press = select/deselect all
    checkBoxes.forEach(function (each) {
      if (each.getAttribute("class") === "inclusionCheckbox") {
        each.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          var curCondition = !each.checked;
          checkBoxes.forEach(function (box) {
            if (box.getAttribute("class") === "inclusionCheckbox") {
              box.checked = curCondition;
            }
          });
          doSave();
          countMats();
        });
      }
    });

    //Right click / long press = select/deselect all items in set
    canvases.forEach(function (each) {
      if (each.getAttribute("class") === "item") {
        each.addEventListener("contextmenu", function (e) {
          e.preventDefault();

          var itemSet = each.set;
          var curCondition = !each.ticked;

          canvases.forEach(function (item) {
            if (item.set === itemSet) {
              item.ticked = curCondition;
              drawFromItemList(item);
              doSave();
              countMats();
            }
          });
          countMats();
        });
      }
    });

    doLoadStorage();
  }

  function countMats() {
    var result = {};

    var sets = Array.from(document.getElementsByClassName("itemSet")); // Sets

    var active = sets.filter(function (set) {
      // That are active (ticked)
      return set.getElementsByClassName("setIncluded")[0].getElementsByTagName("input")[0].checked;
    });

    Array.from(active).forEach(function (active) {
      var items = Array.from(active.getElementsByTagName("canvas")); // Canvases from them
      items.forEach(function (each) {
        if (!each.ticked) {
          // That are not ticked as completed
          for (var i = 0; i < each.upgrades.length; i++) {
            result[each.upgrades[i]["name"]] = result[each.upgrades[i]["name"]] || {};

            result[each.upgrades[i]["name"]]["mat"] = result[each.upgrades[i]["name"]]["mat"] || 0;
            result[each.upgrades[i]["name"]]["desc"] = result[each.upgrades[i]["name"]]["desc"] || '';

            result[each.upgrades[i]["name"]]["mat"] = result[each.upgrades[i]["name"]]["mat"] + each.upgrades[i]["qty"];
            result[each.upgrades[i]["name"]]["desc"] = result[each.upgrades[i]["name"]]["desc"] + (each.desc + '\n');
          }
        }
      });
    });

    displayResult(result);
  }

  function displayResult(countResult) {
    var resultString = "";
    var sortable = [];
    for (var x in countResult) {
      sortable.push([x, countResult[x]["mat"], countResult[x]["desc"]]);
    }
    sortable.sort();
    sortable.forEach(function (each) {
      resultString += '<span title="' + each[2] + '">';
      resultString += '<a href="http://zelda.wikia.com/wiki/' + each[0].replace("'", "%27") + '" target="_blank">';
      resultString += each[0] + '</a>';
      resultString += ' - ' + each[1] + '</span><br>';
    });
    resultDisplay.innerHTML = resultString;
  }

  function toggleTick(event) {
    if (event.target.getAttribute("class") === "item") {
      event.target.ticked = event.target.ticked ? false : true;
      drawFromItemList(event.target);
    }
  }

  function doSave() {
    localStorage.setItem("checkBoxes", JSON.stringify(checkBoxes.map(function (m) {
      return m.checked;
    })));
    localStorage.setItem("canvases", JSON.stringify(canvases.map(function (m) {
      return m.ticked;
    })));
  }

  function doLoadStorage() {
    if (localStorage.getItem("checkBoxes")) {
      (function () {
        var savedChecks = JSON.parse(localStorage.getItem("checkBoxes"));
        var savedCanvases = JSON.parse(localStorage.getItem("canvases"));

        checkBoxes.forEach(function (each, i, arr) {
          return arr[i].checked = savedChecks[i];
        });
        canvases.forEach(function (each, i, arr) {
          return arr[i].ticked = savedCanvases[i];
        });
      })();
    }
  }

  return { init: init };
}();

console.clear();
document.getElementById("pp").setAttribute("title", 'If you\'ve found this useful please consider.\nAnything is much appreciated.');
app.init();
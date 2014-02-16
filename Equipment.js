var Equipment = new Object;

Equipment.selectEquipment = function(name, array) {
    if (name == "random") {
        return Combat.utils.randomChoice(array);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == name) {
            return array[i];
        }
    }

    throw new Error("unknown equippable: " + name);
}
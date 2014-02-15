var Equipment = new Object;

Equipment.selectEquipment = function(name, array, factory) {
    if (name == "random") {
        return factory(Combat.utils.randomChoice(array));
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == name) {
            return factory(array[i]);
        }
    }

    throw new Error("unknown equippable: " + name);
}
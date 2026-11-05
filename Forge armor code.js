/** Put it in code block. */
/** CONFIGURATION */
const FORGE_ITEM_ID = "Diamond ";
const FORGE_ITEM_NAME = "Sunny ";
const FORGE_ITEM_DESC = "Infused with the blinding brilliance of the sun itself. Ultimate defense!";
const enchantments = {
    "Protection": 14,
    "Health Regen": 5,
    "Health": 10,
};
const FORGE_QUANTITY = 1;
const COSTS = {
    "Diamond": 600,
    "Moonstone": 25,
    "Stick": 5
};
const MONEY_COST = 25000;
/** CONFIGURATION END */
let errorMsg = [
    { icon: "exclamation", style: { color: "red", fontSize: "30px" } },
    { str: "You do not have enough materials!\nRequired:\n", style: { color: "red" } }
];
let showError = false;
for (let item in COSTS) {
    let currentAmount = api.getInventoryItemAmount(myId, item);
    if (currentAmount < COSTS[item]) {
        showError = true;
        errorMsg.push(
            { str: `${COSTS[item] - currentAmount}x `, style: { color: "red" } },
            { icon: item },
            { str: ` ${item}\n`, style: { color: "red" } }
        );
    }
}
let currentMoney = stats(myId, "money", "get");
if (currentMoney < MONEY_COST) {
    showError = true;
    errorMsg.push(
        { str: `${MONEY_COST - currentMoney} `, style: { color: "red" } },
        { icon: "coins fa-flip", style: { color: "red" } },
        { str: " Money\n", style: { color: "red" } }
    );
}
if (showError) {
    errorMsg.push({ str: `more to buy ${FORGE_ITEM_NAME}Armor Set`, style: { color: "red" } });
    api.sendMessage(myId, errorMsg);
} else {
    for (let item in COSTS) {
        api.removeItemName(myId, item, COSTS[item]);
    }
    stats(myId, "money", "rem", MONEY_COST);
    for (let item of ["Helmet", "Chestplate", "Gauntlets", "Leggings", "Boots"])
        api.giveItem(myId, FORGE_ITEM_ID + item, FORGE_QUANTITY, {
            customDisplayName: FORGE_ITEM_NAME + item,
            customDescription: FORGE_ITEM_DESC,
            customAttributes: {
                enchantments: enchantments,
                enchantmentTier: "Tier 5"
            }
        });
    updateUi(myId);
    api.sendMessage(myId, [{ icon: "joystick", style: { color: "lime" } }, { str: "You successfully bought the " + FORGE_ITEM_NAME + "Armor Set!", style: { color: "orange" } }]);
}

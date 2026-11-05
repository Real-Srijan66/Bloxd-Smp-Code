/** Put it in code block. */
/** CONFIGURATION */
const FORGE_ITEM_ID = "Diamond Sword";
const FORGE_ITEM_NAME = "Sunny Sword";
const FORGE_ITEM_DESC = "Praise the Sun! Blind your enemies with pure solar fury.";
const enchantments = {
    "Damage": 12,
    "Critical Damage": 9,
    "Vertical Knockback": 8,
    "Horizontal Knockback": 4
};
const FORGE_QUANTITY = 1;
const COSTS = {
    "Diamond": 300,
    "Moonstone": 10,
    "Stick": 2
};
const MONEY_COST = 15000;
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
            { str: `${COSTS[item]-currentAmount}x `, style: { color: "red" } },
            { icon: item },
            { str: ` ${item}\n`, style: { color: "red" } }
        );
    }
}
let currentMoney = stats(myId, "money", "get");
if (currentMoney < MONEY_COST) {
    showError = true;
    errorMsg.push(
        { str: `${MONEY_COST-currentMoney} `, style: { color: "red" } },
        { icon: "coins fa-flip", style: { color: "red" } },
        { str: " Money\n", style: { color: "red" } }
    );
}
if (showError) {
    errorMsg.push({ str: `more to buy ${FORGE_ITEM_NAME}`, style: { color: "red" } });
    api.sendMessage(myId, errorMsg);
} else {
    for (let item in COSTS) {
        api.removeItemName(myId, item, COSTS[item]);
    }
    stats(myId, "money", "rem", MONEY_COST);

    api.giveItem(myId, FORGE_ITEM_ID, FORGE_QUANTITY, {
        customDisplayName: FORGE_ITEM_NAME,
        customDescription: FORGE_ITEM_DESC,
        customAttributes: {
            enchantments: enchantments,
            enchantmentTier: "Tier 5"
        }
    });
    updateUi(myId);
    api.sendMessage(myId, [{ icon: "joystick", style: { color: "lime" } }, { str: "You successfully bought a " + FORGE_ITEM_NAME, style: { color: "orange" } }]);
}

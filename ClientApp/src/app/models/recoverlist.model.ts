export class SearchInfo {
    searchId: any | null;
    commerceId: any | null;
    commerceToken: any | null;
    items: Item[] = [];
}

export class Item {
    itemName: any;
    itemCode: any | null;
    available: boolean | null;
    source: any | null;
    keyword: any | null;
}
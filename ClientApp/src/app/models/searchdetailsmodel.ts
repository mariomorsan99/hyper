
export class ResultModel {
    public displays: any[] = [];
}

export class Search {
    public Id: string;
    public Keyword: string;
    public Name: string;
    public SearchDetail: SearchDetail[];
}

export class CommerceToken {
    public CommerceToken: string;
}

export class SearchDetail {
    public SearchDetail: CommerceToken[];
}

export class CommerceItem {
    public name: string;
    public commercename: any[];
    public keyword: string;
    public price: any[];
    public source: any[];
}

export class CommerceName {
    public CommerceName: CommerceTokenName;
}
export class CommerceTokenName { 
    public CommerceTokenName: string;
}
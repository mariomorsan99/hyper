
export class  SearchView {
    CommerceToken: any[];
    ItemName: ItemInfo[];
}

export class Search {
    public Id: string;
    public Keyword: string;
    public Name: string;
    public Schedule: Schedule;
    public SearchDetail: SearchDetail[];
    public Status: any;
    public CurrentDate: Date;
}

export class Schedule {
    public DateSince: string;
    public DateUntil: string;
    public ConcurrentSchedule: any;
    public LastExecution: string;
}

export class SearchDetail {
    public CommerceId: any;
    public CommerceToken: any;
    public SearchDetail: CommerceToken[];
    public ScraperConfig: ScraperConfig;
    public SelectedItem: SelectedItem;
}
   
 export class CommerceToken {
    public CommerceToken: string;
}

 export class ScheduleToken {
    public DateSince: string;
    public DateUntil: string;
    public ConcurrentSchedule: any;
}

 export class ItemInfo {
    public CommerceId: any;
    public ItemName: string;
    public ItemCode: string;
    public Model: string;
    public Brand: string;
}

export class SelectedItem {
    public SearchId: string;
    public CommerceId: any;
    public ItemName: string;
    public ItemCode: string;
    public Model: string;
    public Keyword: string;
    public Brand: string;
    public source: string;
}

export class ScraperConfig {
    SearchId: any;
    CommerceId: any;
    CommerceToken: any;
    Keyword: any;
    Source: any;
    ItemInfoId: any;
}

export class CommerseItem {
    public name: string;
    public commercename: any[];
}
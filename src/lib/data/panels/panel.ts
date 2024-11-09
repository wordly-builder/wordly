export interface Panel {
    name: string;
    icon: any;
    create: (universeId: string, session: any) => Promise<any>;
    url: string;
}

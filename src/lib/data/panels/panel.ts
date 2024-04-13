export interface Panel {
    name: string;
    icon: any;
    isActive: (universe: Universe) => boolean;
    create: (universeId: number, session: any) => Promise<any>;
    url: string;
}

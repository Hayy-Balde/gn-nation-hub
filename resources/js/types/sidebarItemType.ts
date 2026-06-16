export type SidebarItemsType = {
    id: string,
    icon: React.ElementType,
    label: string,
    route: string
    active?: boolean,
}
export type StatsCardsType = {
    icon: React.ElementType,
    title: string,
    value: string,
    change?: string,
    color?: string
}

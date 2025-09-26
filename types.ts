// Global shared types & enums for buig
export type BuigSize = 'sm' | 'md' | 'lg';
export type BuigVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface BuigInstallOptions {
    /** register components with a custom prefix, defaults to '' */
    prefix?: string;
}

export interface BuigComponentWithName {
    name: string;
}

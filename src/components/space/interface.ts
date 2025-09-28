import type { VNode } from 'vue';

// Size literal type
export type BuigSpaceSizeLiteral = 'mini' | 'small' | 'medium' | 'large';
export type BuigSpaceSize = number | BuigSpaceSizeLiteral;
export type BuigSpaceSizeLike = BuigSpaceSize | [BuigSpaceSize, BuigSpaceSize];

export interface BuigSpaceProps {
    size?: BuigSpaceSizeLike; // 支持单值或 [x, y]
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'center' | 'end' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: boolean;
    fill?: boolean; // vertical 模式拉伸子项 width:100%
}

export interface BuigSpaceSlots {
    default?: () => VNode[] | undefined;
    split?: () => VNode[] | VNode | undefined;
}

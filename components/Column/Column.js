import React from 'react'
import ParagraphGroup from '../ColumnParagraphGroup';
import HeadingGroup from '../ColumnHeadingGroup';
import TitleGroup from "../ColumnTitleGroup/TitleGroup";

const contentComponents = {
    'paragraph_group': ParagraphGroup,
    'key_group': ParagraphGroup,
    'series_group': ParagraphGroup,
    'chapter_group': ParagraphGroup,
    'title_group': TitleGroup
};

const ColumnItem = ({item, id}) => {
    const ContentComponent = contentComponents[item.model];
    return ContentComponent
        ? <ContentComponent {...item} id={id} />
        : <div>{`Content with unknown item type "${item.model}"`}</div>
};

const Column = ({items = [], id}) => (
    <React.Fragment>
        {items.map((item, index) => <ColumnItem key={index} item={item} id={id}/>)}
    </React.Fragment>
);

export default Column

/**
 * External dependencies
 */
import type { Properties } from 'csstype';
import type { Dispatch, SetStateAction } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '../BlockAttributes';
import type { VSelectedCells, VSelectedLine } from '../utils/table-state';

type Props = {
	attributes: BlockAttributes;
	setAttributes: ( attrs: Partial< BlockAttributes > ) => void;
	insertBlocksAfter: ( blocks: BlockInstance[] ) => void;
	setSelectedLine: Dispatch< SetStateAction< VSelectedLine > >;
	setSelectedCells: Dispatch< SetStateAction< VSelectedCells > >;
	captionStylesObj: Properties;
};

export default function TableCaption( {
	attributes,
	setAttributes,
	insertBlocksAfter,
	setSelectedLine,
	setSelectedCells,
	captionStylesObj,
}: Props ) {
	const { caption } = attributes;

	const useOnFocus = !! window?.ftbObj?.useOnFocus;

	// TODO: Once the minimum WordPress version supported by the plugin is 6.3 or higher,
	// Use only onFocus.
	const focusProp = useOnFocus
		? {
				onFocus: () => {
					setSelectedLine( undefined );
					setSelectedCells( undefined );
				},
		  }
		: {
				unstableOnFocus: () => {
					setSelectedLine( undefined );
					setSelectedCells( undefined );
				},
		  };

	const onChange = ( value: string ) => setAttributes( { caption: value } );

	return (
		<RichText
			aria-label={ __( 'Table caption text', 'flexible-table-block' ) }
			placeholder={ __( 'Add caption', 'flexible-table-block' ) }
			tagName="figcaption"
			style={ captionStylesObj }
			value={ caption }
			onChange={ onChange }
			{ ...focusProp }
			// @ts-ignore: `__unstableOnSplitAtEnd` prop is not exist at @types
			__unstableOnSplitAtEnd={ () => insertBlocksAfter( createBlock( 'core/paragraph' ) ) }
		/>
	);
}

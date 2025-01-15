import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

// Props
type ArticleParamsFormProps = {
	defaultArticleForm: ArticleStateType;
	setDefaultArticleForm: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticleForm,
	setDefaultArticleForm,
}: ArticleParamsFormProps) => {

	// Open / Close Hook
	const [isOpen, setIsOpen] = useState(false);

	// Form State Config
	const [state, setState] = useState(defaultArticleForm);

	// Current Element
	const ref = useRef<HTMLFormElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: ref,
		onClose: () => setIsOpen(false),
		onChange: () => setState(state),
	});

	// Open / Close Aside Modal Function
	const handleToggleForm = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	// Form Loading Config
	const handleSubmitForm = (e: FormEvent) => {
		e.preventDefault();
		setDefaultArticleForm(state);
	};

	// Reseting Form Config
	const handleResetForm = () => {
		setState(defaultArticleForm);
		setDefaultArticleForm(defaultArticleState);
	};

	// Changing Font Family Function
	const handleChangeFontFamilyOptions = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	// Changing Font Size Function
	const handleChangeFontSizeOptions = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	// Changing Font Color Function
	const handleChangeFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	// Changing Background Color Function
	const handleChangeBackgroundColors = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	// Changing Content Width Function
	const handleChangeContentWidthArr = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}
					ref={ref}>
					<Text
						as='div'
						size={31}
						dynamic={false}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'
						dynamicLite={false}>
						Задайте параметры
					</Text>

					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChangeFontFamilyOptions}
						title='шрифт'
					/>

					<RadioGroup
						selected={state.fontSizeOption}
						onChange={handleChangeFontSizeOptions}
						options={fontSizeOptions}
						title='рАЗМЕР шрифта'
						name='font-size'
					/>

					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={handleChangeFontColor}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleChangeBackgroundColors}
						title='Цвет фона'
					/>

					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChangeContentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

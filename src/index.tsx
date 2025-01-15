import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [defaultArticleForm, setDefaultArticleForm] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleForm.fontFamilyOption.value,
					'--font-size': defaultArticleForm.fontSizeOption.value,
					'--font-color': defaultArticleForm.fontColor.value,
					'--container-width': defaultArticleForm.contentWidth.value,
					'--bg-color': defaultArticleForm.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
				defaultArticleForm= {defaultArticleForm}
				setDefaultArticleForm = {setDefaultArticleForm}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

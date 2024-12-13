// import { RichTextEditor } from '@enipx/react-rich-text-editor';
import { Grid2 as Grid, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { InputOutlined, PageTitle, SaveButton } from '@root/components';
import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';

export default function TemplatePage({ ...sharedProps }) {
  const { theme, watchFields, setValue, handleSubmit, createPage } = sharedProps;

  return (
    <form onSubmit={handleSubmit(createPage)}>
      <Grid container alignItems="center">
        <Grid size={{ md: 10, sm: 10, lg: 10 }}>
          <PageTitle title="Adicionar nova página" />
        </Grid>

        <Grid size={{ md: 2, sm: 2, lg: 2 }} textAlign="end">
          <SaveButton
            theme={theme}
            icon={<SaveIcon sx={{ color: '#fff' }} />}
            text="Salvar"
            type="submit"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={{ md: 12, sm: 12, lg: 12 }}>
          <InputOutlined
            label="Título da página"
            value={watchFields?.title}
            onChange={(e) => setValue('title', e.target.value)}
          />
        </Grid>
        {/* <Grid size={{ md: 12, sm: 12, lg: 12 }}>
          <RichTextEditor
            value={''}
            onChange={(value) => {
              console.log(value);
            }}
            containerStyle={{
              border: `1px solid rgba(0,0,0,0.2)`,
              minHeight: '70px',
              borderRadius: '10px',
              padding: '0 1rem',
              fontSize: '0.85rem',
              paddingTop: '1rem',
            }}
            // {...rest}
          />
        </Grid> */}
        <Grid
          size={{ md: 12, sm: 12, lg: 12 }}
          sx={{
            '.rsw-ce': {
              background: '#fff',
              minHeight: 300,
            },
          }}
        >
          <EditorProvider>
            <Editor
              value={watchFields?.content}
              onChange={(e) => setValue('content', e.target.value)}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </Grid>
      </Grid>
    </form>
  );
}

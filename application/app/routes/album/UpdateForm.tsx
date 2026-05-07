import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, TextField, Label, Input, FieldError, TextArea, Select, ListBox, Checkbox } from '@heroui/react';
import type { PressEvent } from '@heroui/react';
import useAuth from '../../utils/useAuth';
import { updateAlbum } from '../../api/album';

export default function UpdateForm({ album }: { album: Album }) {
  const { t } = useTranslation('', { keyPrefix: 'album.userAlbum' });
  const { user } = useAuth();

  const onSubmit = async (
    _: unknown,
    state: FormData
  ): Promise<{
    name: string;
    description: string;
    layout: AlbumLayout;
    gaps: AlbumGaps;
    retention: AlbumRetention;
    changeLayout: boolean;
  }> => {
    const name = state.get('name') as string;
    const description = state.get('description') as string;
    const layout = state.get('layout') as AlbumLayout;
    const gaps = state.get('gaps') as AlbumGaps;
    const retention = state.get('retention') as AlbumRetention;
    const changeLayout = state.get('changeLayout') === 'on';

    await updateAlbum(album.id, { name, description, layout, gaps, retention, changeLayout });

    return { name, description, layout, gaps, retention, changeLayout };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, {
    name: album.name,
    description: album.description,
    layout: album.layout,
    gaps: album.gaps,
    retention: album.retention,
    changeLayout: album.changeLayout,
  });

  const onCopyClick = (event: PressEvent) => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`);

    (event.target as HTMLButtonElement).innerHTML =
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = t('album.userAlbum.copyButton');
    }, 2000);
  };

  return (
    <Form action={formAction}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div>
          <TextField name="name" type="text" defaultValue={state.name}>
            <Label>{t('name')}</Label>
            <Input placeholder={t('namePlaceholder')} />
            <FieldError>{t('requiredField')}</FieldError>
          </TextField>

          <TextField name="description" className="mt-4" defaultValue={state.description}>
            <Label>{t('description')}</Label>
            <TextArea rows={6} placeholder={t('descriptionPlaceholder')} className="py-2" />
            <FieldError>{t('requiredField')}</FieldError>
          </TextField>
        </div>
        <div>
          <Select
            name="layout"
            defaultValue={state.layout || 'cols'}
            selectionMode="single"
            disabledKeys={user === null ? ['rows', 'tiles'] : []}
          >
            <Label>{t('layout')}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="cols" textValue={t('layoutOptions.cols')}>
                  {t('layoutOptions.cols')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="rows" textValue={t('layoutOptions.rows')}>
                  {t('layoutOptions.rows')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="tiles" textValue={t('layoutOptions.tiles')}>
                  {t('layoutOptions.tiles')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <Checkbox name="changeLayout" defaultSelected id="changeLayout" isDisabled={user === null} className="mb-4">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label htmlFor="changeLayout">{t('changeLayout')}</Label>
            </Checkbox.Content>
          </Checkbox>

          <Select
            name="gaps"
            defaultValue={state.gaps || 'medium'}
            disabledKeys={user === null ? ['none', 'small', 'large'] : []}
            selectionMode="single"
          >
            <Label>{t('gaps')}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="none" textValue={t('gapsOptions.none')}>
                  {t('gapsOptions.none')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="small" textValue={t('gapsOptions.small')}>
                  {t('gapsOptions.small')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="medium" textValue={t('gapsOptions.medium')}>
                  {t('gapsOptions.medium')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="large" textValue={t('gapsOptions.large')}>
                  {t('gapsOptions.large')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            name="retention"
            defaultValue={user === null ? '1' : '0'}
            disabledKeys={user === null ? ['7', '31', '366', '0'] : []}
            selectionMode="single"
            className="mt-4"
          >
            <Label>{t('retention')}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="1" textValue={t('retentionOptions.1')}>
                  {t('retentionOptions.1')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="7" textValue={t('retentionOptions.7')}>
                  {t('retentionOptions.7')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="31" textValue={t('retentionOptions.31')}>
                  {t('retentionOptions.31')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="366" textValue={t('retentionOptions.366')}>
                  {t('retentionOptions.366')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="0" textValue={t('retentionOptions.0')}>
                  {t('retentionOptions.0')}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField
            name="shortUrl"
            className="mt-4"
            value={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`}
          >
            <Label>{t('link')}</Label>
            <Input readOnly disabled />
          </TextField>
        </div>
      </div>
      <div className="mt-4 flex justify-center w-full">
        <Button
          variant="primary"
          type="submit"
          isDisabled={isPending || user === null}
          data-tracking-id="album_form_button_save_click"
        >
          {t('submitButton')}
        </Button>

        <Button
          variant="secondary"
          className="ms-2"
          onPress={onCopyClick}
          data-tracking-id="album_form_button_copy_click"
        >
          {t('copyButton')}
        </Button>
      </div>
    </Form>
  );
}

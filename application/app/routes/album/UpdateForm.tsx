import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Textarea, Select, SelectItem, Checkbox } from '@heroui/react';
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
          <Input
            errorMessage={t('requiredField')}
            label={t('name')}
            labelPlacement="outside-top"
            name="name"
            placeholder={t('namePlaceholder')}
            defaultValue={state.name}
            type="text"
          />

          <Textarea
            className="mt-4"
            errorMessage={t('requiredField')}
            label={t('description')}
            labelPlacement="outside-top"
            name="description"
            placeholder={t('descriptionPlaceholder')}
            defaultValue={state.description}
            classNames={{
              inputWrapper: 'py-2',
            }}
          />
        </div>
        <div>
          <Select
            label={t('layout')}
            name="layout"
            labelPlacement="outside"
            defaultSelectedKeys={[state.layout || 'cols']}
            selectionMode="single"
            disabledKeys={user === null ? ['rows', 'tiles'] : []}
          >
            <SelectItem key="cols">{t('layoutOptions.cols')}</SelectItem>
            <SelectItem key="rows">{t('layoutOptions.rows')}</SelectItem>
            <SelectItem key="tiles">{t('layoutOptions.tiles')}</SelectItem>
          </Select>

          <Checkbox name="changeLayout" defaultSelected={true} isDisabled={user === null} className="mb-4">
            {t('changeLayout')}
          </Checkbox>

          <Select
            label={t('gaps')}
            name="gaps"
            labelPlacement="outside"
            defaultSelectedKeys={[state.gaps || 'medium']}
            disabledKeys={user === null ? ['none', 'small', 'large'] : []}
            selectionMode="single"
            classNames={{
              base: 'mb-10',
            }}
          >
            <SelectItem key="none">{t('gapsOptions.none')}</SelectItem>
            <SelectItem key="small">{t('gapsOptions.small')}</SelectItem>
            <SelectItem key="medium">{t('gapsOptions.medium')}</SelectItem>
            <SelectItem key="large">{t('gapsOptions.large')}</SelectItem>
          </Select>

          <Select
            label={t('retention')}
            name="retention"
            labelPlacement="outside"
            defaultSelectedKeys={user === null ? ['1'] : ['0']}
            disabledKeys={user === null ? ['7', '31', '366', '0'] : []}
            selectionMode="single"
          >
            <SelectItem key="1">{t('retentionOptions.1')}</SelectItem>
            <SelectItem key="7">{t('retentionOptions.7')}</SelectItem>
            <SelectItem key="31">{t('retentionOptions.31')}</SelectItem>
            <SelectItem key="366">{t('retentionOptions.366')}</SelectItem>
            <SelectItem key="0">{t('retentionOptions.0')}</SelectItem>
          </Select>

          <Input
            label={t('link')}
            labelPlacement="outside-top"
            name="shortUrl"
            value={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`}
            className="mt-4"
            readOnly
            disabled
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center w-full">
        <Button
          color="primary"
          variant="solid"
          type="submit"
          isDisabled={isPending || user === null}
          data-tracking-id="album_form_button_save_click"
        >
          {t('submitButton')}
        </Button>

        <Button
          variant="bordered"
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

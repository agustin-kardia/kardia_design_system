import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { PillButton } from '../../components/PillButton/PillButton';
import { Link } from '../../components/Link/Link';
import { Chip } from '../../components/Chip/Chip';
import { Tag } from '../../components/Tag/Tag';
import { Divider } from '../../components/Divider/Divider';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { ListItem } from '../../components/ListItem/ListItem';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { Alert } from '../../components/Alert/Alert';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { Icon } from '../../components/Icon/Icon';
import { TrainingCard } from '../../components/TrainingCard/TrainingCard';
import { WorkoutCard, WorkoutCardVariant } from '../../components/WorkoutCard/WorkoutCard';
import workoutCardStyles from '../../components/WorkoutCard/WorkoutCard.module.css';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Radio } from '../../components/Radio/Radio';
import { Switch } from '../../components/Switch/Switch';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Modal } from '../../components/Modal/Modal';

// ─── Status badge ─────────────────────────────────────────────────────────────

type Status = 'done' | 'planned';

function StatusBadge({ status }: { status: Status }) {
  return status === 'done' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-feedback-success-light)', color: 'var(--color-text-success)' }}>
      ✓ Done
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-base-low)', color: 'var(--color-text-secondary)' }}>
      ○ Planned
    </span>
  );
}

// ─── Component doc card ───────────────────────────────────────────────────────

function ComponentDoc({
  name,
  status,
  description,
  props,
  children,
}: {
  name: string;
  status: Status;
  description: string;
  props: string[];
  children: React.ReactNode;
}) {
  const [showProps, setShowProps] = useState(false);

  return (
    <section className="mb-10">
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{name}</h2>
          <StatusBadge status={status} />
        </div>
        <button
          onClick={() => setShowProps(v => !v)}
          className="text-xs font-medium px-2 py-1 rounded transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {showProps ? 'Hide props' : 'Props ↓'}
        </button>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>

      {showProps && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {props.map(p => (
            <code key={p} className="text-[11px] px-2 py-0.5 rounded font-mono" style={{ background: 'var(--color-base-low)', color: 'var(--color-text-primary)' }}>
              {p}
            </code>
          ))}
        </div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border-high)' }}>
        <div className="p-6 flex flex-wrap gap-4 items-center min-h-[80px]" style={{ background: 'var(--color-base-flat)' }}>
          {children}
        </div>
      </div>

      <div className="h-px mt-10" style={{ background: 'var(--color-border-high)' }} />
    </section>
  );
}


// ─── Row label helper ─────────────────────────────────────────────────────────

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-disabled)' }}>{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ─── WorkoutCard animation demo ───────────────────────────────────────────────

const ZONE_METRICS: Record<WorkoutCardVariant, { kardiaPoints: number | null; calories: number | null; intensityPercent: number | null }> = {
  idle:           { kardiaPoints: null, calories: null, intensityPercent: null },
  low:            { kardiaPoints: 42,   calories: 210,  intensityPercent: 52 },
  medium:         { kardiaPoints: 87,   calories: 430,  intensityPercent: 73 },
  high:           { kardiaPoints: 134,  calories: 680,  intensityPercent: 91 },
  'sensor-error': { kardiaPoints: null, calories: null, intensityPercent: null },
  'no-sensor':    { kardiaPoints: null, calories: null, intensityPercent: null },
};

function WorkoutCardAnimationDemo({
  title,
  description,
  sequence,
  styles,
  buttonLabel,
}: {
  title: string;
  description: string;
  sequence: WorkoutCardVariant[];
  styles: Record<string, string>;
  buttonLabel: string;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [impactKey, setImpactKey] = useState(0);
  const [animating, setAnimating] = useState(false);

  const variant = sequence[variantIndex];
  const metrics = ZONE_METRICS[variant];

  function trigger() {
    if (animating) return;
    const nextIndex = (variantIndex + 1) % sequence.length;
    setVariantIndex(nextIndex);
    setImpactKey(k => k + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 450);
  }

  return (
    <section className="mb-10">
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border-high)' }}>
        <div className="p-6 flex flex-col gap-4" style={{ background: 'var(--color-base-flat)' }}>
          <WorkoutCard
            key={impactKey}
            variant={variant}
            participantName="Ignacio Fernández"
            sensorId={12}
            {...metrics}
            className={animating ? styles.impact : undefined}
          />
          <div>
            <button
              onClick={trigger}
              disabled={animating}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: 'var(--color-brand-primary)',
                color: '#fff',
                opacity: animating ? 0.6 : 1,
                cursor: animating ? 'not-allowed' : 'pointer',
              }}
            >
              {buttonLabel} (current: {variant})
            </button>
          </div>
        </div>
      </div>

      <div className="h-px mt-10" style={{ background: 'var(--color-border-high)' }} />
    </section>
  );
}

// ─── Form selector demos ──────────────────────────────────────────────────────

const SENSOR_OPTIONS = [
  { value: '39584', label: '39584' },
  { value: '39543', label: '39543' },
  { value: '39341', label: '39341' },
  { value: '61251', label: '61251' },
];

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentDoc
      name="Checkbox"
      status="done"
      description="Binary selection control with optional label. Supports indeterminate state."
      props={['checked?', 'onChange?', 'label?', 'disabled?', 'indeterminate?']}
    >
      <Row label="States">
        <Checkbox />
        <Checkbox checked={true} />
        <Checkbox indeterminate={true} />
        <Checkbox disabled />
        <Checkbox disabled checked={true} />
      </Row>
      <Row label="With label">
        <Checkbox label="Unchecked" />
        <Checkbox checked={true} label="Checked" />
        <Checkbox disabled label="Disabled" />
      </Row>
      <Row label="Interactive">
        <Checkbox checked={checked} onChange={setChecked} label={checked ? 'Entrena sin sensor ✓' : 'Entrena sin sensor'} />
      </Row>
    </ComponentDoc>
  );
}

function RadioDemo() {
  const [selected, setSelected] = useState('a');
  return (
    <ComponentDoc
      name="Radio"
      status="done"
      description="Single-selection control. Use multiple Radio buttons sharing a name for a group."
      props={['checked?', 'onChange?', 'label?', 'disabled?', 'name?', 'value?']}
    >
      <Row label="States">
        <Radio />
        <Radio checked={true} />
        <Radio disabled />
        <Radio disabled checked={true} />
      </Row>
      <Row label="With label">
        <Radio label="Unselected" />
        <Radio checked={true} label="Selected" />
        <Radio disabled label="Disabled" />
      </Row>
      <Row label="Interactive group">
        <Radio name="demo" value="a" checked={selected === 'a'} onChange={() => setSelected('a')} label="Option A" />
        <Radio name="demo" value="b" checked={selected === 'b'} onChange={() => setSelected('b')} label="Option B" />
        <Radio name="demo" value="c" checked={selected === 'c'} onChange={() => setSelected('c')} label="Option C" />
      </Row>
    </ComponentDoc>
  );
}

function SwitchDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(false);
  return (
    <ComponentDoc
      name="Switch"
      status="done"
      description="Toggle control with smooth animated transition. Available in small and medium sizes."
      props={['checked?', 'onChange?', 'size?: small | medium', 'label?', 'disabled?']}
    >
      <Row label="Small">
        <Switch size="small" checked={false} />
        <Switch size="small" checked={true} />
        <Switch size="small" checked={false} disabled />
        <Switch size="small" checked={true} disabled />
      </Row>
      <Row label="Medium">
        <Switch size="medium" checked={false} />
        <Switch size="medium" checked={true} />
        <Switch size="medium" checked={false} disabled />
        <Switch size="medium" checked={true} disabled />
      </Row>
      <Row label="Interactive">
        <Switch size="small" checked={sm} onChange={setSm} label={sm ? 'Small: On' : 'Small: Off'} />
        <Switch size="medium" checked={md} onChange={setMd} label={md ? 'Medium: On' : 'Medium: Off'} />
      </Row>
    </ComponentDoc>
  );
}

function DropdownDemo() {
  const [val, setVal] = useState('');
  return (
    <ComponentDoc
      name="Dropdown"
      status="done"
      description="Select input with a portal-rendered option sheet. Supports label, placeholder, and disabled state."
      props={['options: {value, label}[]', 'value?', 'onChange?', 'label?', 'placeholder?', 'disabled?']}
    >
      <Row label="Default (no selection)">
        <div style={{ width: 280 }}>
          <Dropdown options={SENSOR_OPTIONS} label="ID del sensor" placeholder="Seleccionar ID" />
        </div>
      </Row>
      <Row label="With value">
        <div style={{ width: 280 }}>
          <Dropdown options={SENSOR_OPTIONS} label="ID del sensor" value="39584" />
        </div>
      </Row>
      <Row label="Interactive">
        <div style={{ width: 280 }}>
          <Dropdown options={SENSOR_OPTIONS} label="ID del sensor" value={val} onChange={setVal} placeholder="Seleccionar ID" />
        </div>
      </Row>
      <Row label="Disabled">
        <div style={{ width: 280 }}>
          <Dropdown options={SENSOR_OPTIONS} label="ID del sensor" placeholder="Seleccionar ID" disabled />
        </div>
      </Row>
    </ComponentDoc>
  );
}

function ModalDemo() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  return (
    <ComponentDoc
      name="Modal"
      status="done"
      description="Portal-rendered dialog. Supports eyebrow, title, description, close button, and flexible footer layouts."
      props={['open', 'onClose?', 'title', 'eyebrow?', 'description?', 'showClose?', 'primaryAction?', 'secondaryAction?', 'footerLeft?', 'footer?', 'children?']}
    >
      <Row label="Standard (2 buttons + close)">
        <button
          onClick={() => setOpenA(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--color-brand-primary)', color: '#fff' }}
        >
          Open modal
        </button>
        <Modal
          open={openA}
          onClose={() => setOpenA(false)}
          title="Asignar sensor"
          showClose
          primaryAction={{ label: 'Confirmar', onClick: () => setOpenA(false) }}
          secondaryAction={{ label: 'Cancelar', onClick: () => setOpenA(false) }}
          footerLeft={<Checkbox label="Entrena sin sensor" />}
        >
          <div style={{ background: 'var(--color-base-lowest)', borderRadius: 'var(--border-radius-large)', padding: 'var(--spacing-large)', color: 'var(--color-text-primary)' }}>
            Ignacio F.
          </div>
          <Dropdown options={SENSOR_OPTIONS} label="ID del sensor" placeholder="Seleccionar ID" />
        </Modal>
      </Row>
      <Row label="Eyebrow + stacked footer (no close)">
        <button
          onClick={() => setOpenB(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--color-brand-primary)', color: '#fff' }}
        >
          Open modal
        </button>
        <Modal
          open={openB}
          onClose={() => setOpenB(false)}
          eyebrow="Entrenamiento activo"
          title="HIIT - Laura está activo actualmente"
          description="Comenzar un nuevo entrenamiento finalizará el actual."
          showClose={false}
          footer={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-small)', width: '100%', paddingBottom: 'var(--spacing-medium)' }}>
              <Button variant="secondary-branded" size="xlarge" fullWidth onClick={() => setOpenB(false)}>Continuar con HIIT - Laura</Button>
              <Button variant="primary" size="xlarge" fullWidth onClick={() => setOpenB(false)}>Comenzar nuevo entrenamiento</Button>
              <Button variant="tertiary" size="xlarge" fullWidth onClick={() => setOpenB(false)}>Cancelar</Button>
            </div>
          }
        />
      </Row>
    </ComponentDoc>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-10 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Components</h1>
        <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          All components accept <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--color-base-low)' }}>className</code> for overrides and forward HTML element props.
          Toggle "Props ↓" on any card to see available props.
        </p>
        <div className="flex gap-3">
          <StatusBadge status="done" />
          <StatusBadge status="planned" />
        </div>
      </div>

      {/* ── Button ── */}
      <ComponentDoc
        name="Button"
        status="done"
        description="Primary action element. Supports three variants, four sizes, optional icons, and full-width mode."
        props={['variant: primary | secondary | tertiary', 'size: small | medium | large | xlarge', 'leftIcon?', 'rightIcon?', 'fullWidth?', 'disabled?']}
      >
        <Row label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </Row>
        <Row label="Sizes">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="xlarge">XLarge</Button>
        </Row>
        <Row label="With icons + disabled">
          <Button leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-contained)" />}>Left icon</Button>
          <Button rightIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-contained)" />}>Right icon</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </Row>
      </ComponentDoc>

      {/* ── PillButton ── */}
      <ComponentDoc
        name="PillButton"
        status="done"
        description="Pill-shaped button for compact actions. Supports icon-only mode."
        props={['variant: primary | secondary', 'size: small | medium', 'iconOnly?', 'leftIcon?', 'rightIcon?', 'disabled?']}
      >
        <Row label="Variants × Sizes">
          <PillButton variant="primary" size="small">Small</PillButton>
          <PillButton variant="primary" size="medium">Medium</PillButton>
          <PillButton variant="secondary" size="small">Secondary S</PillButton>
          <PillButton variant="secondary" size="medium">Secondary M</PillButton>
        </Row>
        <Row label="Icon Only">
          <PillButton variant="primary" size="small" iconOnly leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-contained)" />} />
          <PillButton variant="primary" size="medium" iconOnly leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-contained)" />} />
          <PillButton variant="secondary" size="small" iconOnly leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-primary)" />} />
        </Row>
        <Row label="Disabled">
          <PillButton variant="primary" disabled>Disabled</PillButton>
          <PillButton variant="secondary" disabled>Disabled</PillButton>
        </Row>
      </ComponentDoc>

      {/* ── Link ── */}
      <ComponentDoc
        name="Link"
        status="done"
        description="Inline anchor styled in brand red. Renders a native <a> tag."
        props={['size: small | medium | large', 'weight: semibold | medium', 'leftIcon?', 'rightIcon?', 'href?']}
      >
        <Row label="Sizes">
          <Link href="#">Small link</Link>
          <Link href="#" size="medium">Medium link</Link>
          <Link href="#" size="large">Large link</Link>
        </Row>
        <Row label="Weights">
          <Link href="#" weight="semibold">Semibold</Link>
          <Link href="#" weight="medium">Medium weight</Link>
        </Row>
        <Row label="With icons">
          <Link href="#" leftIcon={<Icon name="arrow_back" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-branded)" />}>With left icon</Link>
          <Link href="#" rightIcon={<Icon name="arrow_forward" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-branded)" />}>With right icon</Link>
        </Row>
      </ComponentDoc>

      {/* ── Chip ── */}
      <ComponentDoc
        name="Chip"
        status="done"
        description="Toggleable pill for filter/selection UI."
        props={['size: small | medium', 'state: idle | selected | disabled', 'iconOnly?', 'leftIcon?', 'rightIcon?']}
      >
        <Row label="States — Small">
          <Chip size="small" state="idle">Idle</Chip>
          <Chip size="small" state="selected">Selected</Chip>
          <Chip size="small" state="disabled">Disabled</Chip>
        </Row>
        <Row label="States — Medium">
          <Chip size="medium" state="idle">Idle</Chip>
          <Chip size="medium" state="selected">Selected</Chip>
          <Chip size="medium" state="disabled">Disabled</Chip>
        </Row>
        <Row label="With icons">
          <Chip size="small" leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-primary)" />}>With icon</Chip>
          <Chip size="small" state="selected" leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-branded)" />}>Selected</Chip>
          <Chip size="small" iconOnly leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-primary)" />} />
          <Chip size="medium" iconOnly leftIcon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
        </Row>
      </ComponentDoc>

      {/* ── Tag ── */}
      <ComponentDoc
        name="Tag"
        status="done"
        description="Compact badge for categorization. Supports icon and icon-only modes."
        props={['type: default | branded | info | success | failure', 'size: small | regular', 'icon?', 'iconOnly?']}
      >
        <Row label="Types — Regular">
          <Tag type="default">Default</Tag>
          <Tag type="branded">Branded</Tag>
          <Tag type="info">Info</Tag>
          <Tag type="success">Success</Tag>
          <Tag type="failure">Failure</Tag>
        </Row>
        <Row label="Types — Small">
          <Tag type="default" size="small">Default</Tag>
          <Tag type="branded" size="small">Branded</Tag>
          <Tag type="info" size="small">Info</Tag>
          <Tag type="success" size="small">Success</Tag>
          <Tag type="failure" size="small">Failure</Tag>
        </Row>
        <Row label="With icon">
          <Tag type="default" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-primary)" />}>Default</Tag>
          <Tag type="branded" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#eb282c" />}>Branded</Tag>
          <Tag type="info"    icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#0075bb" />}>Info</Tag>
          <Tag type="success" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#008337" />}>Success</Tag>
          <Tag type="failure" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#d00025" />}>Failure</Tag>
        </Row>
        <Row label="Icon only">
          <Tag type="default"  iconOnly icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="var(--color-icon-primary)" />} />
          <Tag type="branded"  iconOnly icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#eb282c" />} />
          <Tag type="info"     iconOnly icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#0075bb" />} />
          <Tag type="success"  iconOnly icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#008337" />} />
          <Tag type="failure"  iconOnly icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={16} color="#d00025" />} />
        </Row>
      </ComponentDoc>

      {/* ── Divider ── */}
      <ComponentDoc
        name="Divider"
        status="done"
        description="Horizontal separator. Supports two intensities and optional padding."
        props={['intensity: normal | high', 'horizontalSpace?', 'verticalSpace?']}
      >
        <div className="w-full space-y-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-disabled)' }}>Normal</p>
            <Divider intensity="normal" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-disabled)' }}>High</p>
            <Divider intensity="high" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-disabled)' }}>With vertical space</p>
            <Divider verticalSpace />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-disabled)' }}>With horizontal space</p>
            <Divider horizontalSpace />
          </div>
        </div>
      </ComponentDoc>

      {/* ── SectionHeader ── */}
      <ComponentDoc
        name="SectionHeader"
        status="done"
        description="Page/section title with optional subtitle, icon, and action link."
        props={['level: one | two', 'size: default | small', 'title', 'subtitle?', 'icon?', 'actionLabel?', 'onAction?']}
      >
        <div className="w-full space-y-2">
          <SectionHeader level="one" size="default" title="Section title" subtitle="Optional subtitle here" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} actionLabel="Ver más" onAction={() => {}} />
          <SectionHeader level="one" size="small" title="Small section" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={20} color="var(--color-icon-primary)" />} actionLabel="Ver más" onAction={() => {}} />
          <SectionHeader level="two" size="default" title="Level two title" />
          <SectionHeader level="two" size="small" title="Level two small" />
        </div>
      </ComponentDoc>

      {/* ── ListItem ── */}
      <ComponentDoc
        name="ListItem"
        status="done"
        description="Flexible list row with left column, main content, and right actions."
        props={['size: small | medium | large', 'style: plain | contained', 'title', 'subtitle?', 'tertiaryText?', 'leftColumn?', 'rightItems?', 'divider?']}
      >
        <div className="w-full space-y-1">
          <Row label="Sizes">
            <div className="w-full space-y-0.5">
              <ListItem size="large" title="Large item" subtitle="With subtitle" leftColumn={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} rightItems={<Icon name="chevron_right" size={24} color="var(--color-icon-secondary)" />} divider />
              <ListItem size="medium" title="Medium item" subtitle="With subtitle" leftColumn={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} divider />
              <ListItem size="small" title="Small item" subtitle="With subtitle" leftColumn={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
            </div>
          </Row>
          <Row label="Contained style">
            <ListItem style="contained" title="Contained item" subtitle="Border around the whole row" leftColumn={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} rightItems={<><Icon name="star" size={24} color="var(--color-icon-secondary)" /><Icon name="chevron_right" size={24} color="var(--color-icon-secondary)" /></>} />
          </Row>
        </div>
      </ComponentDoc>

      {/* ── InfoCard ── */}
      <ComponentDoc
        name="InfoCard"
        status="done"
        description="Information card with title, optional eyebrow, description, caption, and actions."
        props={['orientation: horizontal | vertical', 'style: elevated | outlined | filled', 'icon?', 'eyebrow?', 'title', 'description?', 'caption?', 'actions?']}
      >
        <Row label="Styles — Horizontal">
          <InfoCard style="outlined" title="Outlined" description="Description text" caption="Footer" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
          <InfoCard style="elevated" title="Elevated" description="Description text" caption="Footer" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
          <InfoCard style="filled" title="Filled" description="Description text" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
        </Row>
        <Row label="Vertical + eyebrow">
          <InfoCard orientation="vertical" style="outlined" eyebrow="Category" title="Vertical card" description="Optional description" caption="Footer caption" icon={<Icon name="widgets" weight={300} variant="rounded" fill={0} size={24} color="var(--color-icon-primary)" />} />
        </Row>
      </ComponentDoc>

      {/* ── Alert ── */}
      <ComponentDoc
        name="Alert"
        status="done"
        description="Inline feedback message with icon, subtitle, and action link."
        props={['type: neutral | info | success | warning | critical', 'title', 'subtitle?', 'icon?', 'actions?']}
      >
        <div className="w-full space-y-2">
          <Alert type="neutral"  title="Neutral message"  subtitle="Optional description for this alert." icon={<Icon name="widgets" weight={300} variant="rounded" fill={0}         size={24} color="var(--color-text-primary)"  />} actions={<Link href="#" size="small">Action</Link>} />
          <Alert type="info"     title="Info message"     subtitle="Optional description for this alert." icon={<Icon name="info"    weight={300} variant="rounded" fill={0} size={24} color="#00496b" />} actions={<Link href="#" size="small">Action</Link>} />
          <Alert type="success"  title="Success message"  subtitle="Optional description for this alert." icon={<Icon name="check_circle" size={24} color="#004f21" />} actions={<Link href="#" size="small">Action</Link>} />
          <Alert type="warning"  title="Warning message"  subtitle="Optional description for this alert." icon={<Icon name="warning"      size={24} color="#864611" />} actions={<Link href="#" size="small">Action</Link>} />
          <Alert type="critical" title="Critical message" subtitle="Optional description for this alert." icon={<Icon name="error"        size={24} color="#710020" />} actions={<Link href="#" size="small">Action</Link>} />
        </div>
      </ComponentDoc>

      {/* ── Snackbar ── */}
      <ComponentDoc
        name="Snackbar"
        status="done"
        description="Toast notification for transient feedback. Usually shown programmatically."
        props={['type: default | error | success | warning | branded', 'message', 'icon?', 'action?']}
      >
        <div className="w-full space-y-2">
          <Snackbar type="default" message="Snackbar message"
            icon={<Icon name="info" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-inverted)" />}
            action={<Link href="#" size="small" className="!text-white">Action</Link>} />
          <Snackbar type="branded" message="Snackbar message"
            icon={<Icon name="info" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-contained)" />}
            action={<Link href="#" size="small" className="!text-white">Action</Link>} />
          <Snackbar type="error" message="Error message"
            icon={<Icon name="cancel" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-contained)" />}
            action={<Link href="#" size="small" className="!text-white">Action</Link>} />
          <Snackbar type="success" message="Success message"
            icon={<Icon name="check_circle" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />}
            action={<Link href="#" size="small" className="!text-[var(--color-text-primary)]">Action</Link>} />
          <Snackbar type="warning" message="Warning message"
            icon={<Icon name="warning" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />}
            action={<Link href="#" size="small" className="!text-[var(--color-text-primary)]">Action</Link>} />
        </div>
      </ComponentDoc>

      {/* ── TrainingCard ── */}
      <ComponentDoc
        name="TrainingCard"
        status="done"
        description="Session listing card for the facility check-in screen. Shows coach, session type, date, duration, music, spots, and a check-in button."
        props={['coachImage?', 'coachName', 'sessionType', 'specialTag?', 'date', 'duration', 'music?', 'spotsUsed', 'spotsTotal', 'onCheckin?', 'onClick?']}
      >
        <div className="w-full">
          <TrainingCard
            coachName="Valeria González"
            sessionType="Cardio & Strength"
            specialTag="Special"
            date="Martes 11/08, 10:30 am"
            duration="45 minutos"
            music="Dance & Pop"
            spotsUsed={20}
            spotsTotal={25}
          />
        </div>
      </ComponentDoc>

      {/* ── WorkoutCard ── */}
      <ComponentDoc
        name="WorkoutCard"
        status="done"
        description="Live workout participant card for facility displays. Six variants driven by sensor state and real-time intensity data."
        props={['variant: idle | low | medium | high | sensor-error | no-sensor', 'participantName', 'participantImage?', 'sensorId?', 'kardiaPoints?', 'calories?', 'intensityPercent?', 'onEdit?', 'children?']}
      >
        <div className="w-full flex flex-col gap-3">
          {(
            [
              { variant: 'idle',         label: 'Idle — sensor assigned, waiting to connect',  kardiaPoints: null, calories: null,  intensityPercent: null, sensorId: 12 },
              { variant: 'low',          label: 'Intensity Low (≤ 60%)',                        kardiaPoints: 42,   calories: 210,  intensityPercent: 52  },
              { variant: 'medium',       label: 'Intensity Medium (≤ 80%)',                     kardiaPoints: 87,   calories: 430,  intensityPercent: 73  },
              { variant: 'high',         label: 'Intensity High (> 80%)',                       kardiaPoints: 134,  calories: 680,  intensityPercent: 91  },
              { variant: 'sensor-error', label: 'Sensor Error — shows last known data',         kardiaPoints: 87,   calories: 430,  intensityPercent: null },
              { variant: 'no-sensor',    label: 'No Sensor',                                    kardiaPoints: null, calories: null, intensityPercent: null },
            ] as const
          ).map(({ variant, label, ...props }) => (
            <div key={variant}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-disabled)' }}>{label}</p>
              <WorkoutCard
                variant={variant}
                participantName="Ignacio Fernández"
                {...props}
              />
            </div>
          ))}
        </div>
      </ComponentDoc>

      {/* ── WorkoutCard — Zone Up animation demo ── */}
      <WorkoutCardAnimationDemo
        title="WorkoutCard — Zone Up Animation"
        description="Triggered when a participant moves up to a higher intensity zone (e.g. low → medium → high). Click the button to fire the impact animation."
        sequence={['low', 'medium', 'high'] as WorkoutCardVariant[]}
        styles={workoutCardStyles}
        buttonLabel="Zone Up ↑"
      />

      {/* ── WorkoutCard — Zone Down animation demo ── */}
      <WorkoutCardAnimationDemo
        title="WorkoutCard — Zone Down Animation"
        description="Triggered when a participant drops to a lower intensity zone (e.g. high → medium → low). Click the button to fire the impact animation."
        sequence={['high', 'medium', 'low'] as WorkoutCardVariant[]}
        styles={workoutCardStyles}
        buttonLabel="Zone Down ↓"
      />

      {/* ── Checkbox ── */}
      <CheckboxDemo />

      {/* ── Radio ── */}
      <RadioDemo />

      {/* ── Switch ── */}
      <SwitchDemo />

      {/* ── Dropdown ── */}
      <DropdownDemo />

      {/* ── Modal ── */}
      <ModalDemo />

      {/* ── Text Input (planned) ── */}
      <ComponentDoc
        name="Text Input"
        status="planned"
        description="Single-line and multiline text field with label, helper text, error state, and addons."
        props={['label?', 'placeholder?', 'helperText?', 'error?', 'disabled?', 'leftAddon?', 'rightAddon?']}
      >
        <div className="w-full flex items-center justify-center py-6 rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--color-base-normal)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-disabled)' }}>Coming soon</p>
        </div>
      </ComponentDoc>
    </div>
  );
}

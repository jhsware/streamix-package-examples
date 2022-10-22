import { componentDidAppear, componentWillDisappear } from 'inferno-animation';
import { name } from './streamix_package.json';

type TInfernoFnCompProps = {
  value: object;
  onComponentDidAppear?: (dom: HTMLElement, props) => void;
  onComponentWillDisappear?: (dom: HTMLElement, props: any, callback: Function) => void;
  animation: string;
}

function Logo({value, animation}: TInfernoFnCompProps) {
  return (
    <img class="Logo" src={`packages/${name}/images/logo.png`} />
  )
}

export default function Container({id, name, isStaged, data}) {
  return <div className="graphics-logo">
    {isStaged && <Logo
      value={data}
      onComponentDidAppear={componentDidAppear as any}
      onComponentWillDisappear={componentWillDisappear as any}
      animation="Logo" />}
  </div>
}

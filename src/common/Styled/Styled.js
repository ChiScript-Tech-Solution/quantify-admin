// CUSTOMIZATION OF STYLED COMPONENTS

import { Link } from "react-router-dom";
import { Icons } from "../../constants/Icons";



export const Container = (props) => {
  return (
    <div className={`app__container ${props.sx}`}>
        {props.children}
    </div>
  )

}

export const Wrapper = (props) => {
  return <div className={`${props.sx}`} onClick={props.onClick} key={props.key} style={props.style}>{props.children}</div>;
};

export const Content = (props) => {
  return <div className={props.sx} onClick={props.onClick} key={props.key}>{props.children}</div>;
};

export const Aside = (props) => {
  return <aside className={`${props.sx}`} onClick={props.onClick} key={props.key}>{props.children}</aside>;
};

export const PublicLayout = (props) => {
  return <div className={`auth__layout ${props.sx}`}>{props.children}</div>;
};


export const Layout = (props) => {
  return <div className={`flex ${props.sx}`}>{props.children}</div>;
};

export const Section = (props) => {
  return (
    <section
      className={`${props.sx}`}
      onClick={props.onClick}
      onChange={props.onChange}
      style={props.style}
    >
      {props.children}
    </section>
  );
};

export const Select = (props) => {
  return (
    <select
      className={props.sx}
      name={props.name}
      id={props.id}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      {props.children}
    </select>
  );
};

export const Card = (props) => {
  return <div className={`${props.sx}`} onClick={props.onClick}>{props.children}</div>;
};

export const Img = (props) => {
  return <img width={props.width} src={props.img} alt={props.alt} className={props.sx} title={props.title} />;
};

export const Text = (props) => {
  return (
    <p className={props.sx} onClick={props.onClick} key={props.key}>
      {props.children}
    </p>
  );
};


export const Header = (props) => {
  return (
    <p className={props.sx} onClick={props.onClick}>
      {props.children}
    </p>
  );
};

export const Span = (props) => {
  return (
    <span className={props.sx} onClick={props.onClick} style={props.style}>
      {props.children}
    </span>
  );
};

export const Message = (props) => {
  return <textarea {...props} className={props.sx} />;
};

export const Input = (props) => {
  return (
    <input
      type={props.type }
      onClick={props.onClick}
      onChange={props.onChange}
      name={props.name}
      id={props.id ?? undefined}
      onBlur={props.onBlur}
      value={props.value}
      placeholder={props.placeholder }
      disabled={props.disabled}
      minValue={props.minValue ?? undefined}
      maxValue={props.maxValue ?? undefined}
      className={`${props.sx || "auth__layout__input"}`}
    />
  );
};

export const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`p-3 ${props.sx} ${props.bg || "auth__layout__btn"} ${
        props.color || "light"}`}
    >
      {props.isLoading ? (
        <div className={`loading__spinner ${props.color || "light"}`}>
          <Icons.Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4"><Span>{props.name || "SME & More"}</Span> {props.icon}</div>
      )}
    </button>
  );
};


export const Linked = (props) => {
  return (
    <Link to={props.as} className={props.sx} onClick={props.onClick}>
      {props.children}
    </Link>
  );
} 


export const List = (props) => { 
  return (
    <ul className={props.sx}>
      {props.children}
    </ul>
  );
}

export const ListItem = (props) => { 
    return (
      <li className={props.sx}>
        {props.children}
      </li>
    );
  }


export const Form = (props) => {
  return (
    <form className={props.sx} onChange={props.onChange} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}


export const ModalTitle = (props) => {
  return (
    <div className={`modal__title ${props.sx}`}>
      <p>{props.title}</p>
      <p onClick={props.close} className="cursor-pointer">{props.icon}</p>
    </div>
  )
}

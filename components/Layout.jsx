import { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import getConfig from "next/config";
import Container from "./Container";
import { logout } from "../store/store";

const { publicRuntimeConfig } = getConfig();
const { Header, Content, Footer } = Layout;

const githubIconStyle = {
  color: "#fff",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};

const footerStyle = {
  textAlign: "center"
};

function MyLayout({ children, user, logout }) {
  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback(
    event => {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const handleOnsearch = useCallback(() => {}, []);

  const handelLogout = useCallback(() => {
    logout();
  }, []);

  const userDropDown = () => (
    <Menu>
      <Menu.Item>
        <a href="#" onClick={handelLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnsearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size="40" src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={publicRuntimeConfig.OAUTH_URL}>
                    <Avatar size="40" icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>Develop by JimmieZhou</Footer>
      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }
          .ant-layout {
            height: 100%;
          }
          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
          }
        `}
      </style>
    </Layout>
  );
}
export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  function mapDispatchToProps(dispath) {
    return {
      logout: () => dispath(logout())
    };
  }
)(MyLayout);

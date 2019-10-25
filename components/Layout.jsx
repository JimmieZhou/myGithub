/**
 * 自定义页面布局
 */
import { useState, useCallback } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/router";
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import Container from "./Container";
import { logout } from "../store/store";

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

const MyLayout = ({ children, user, logout, router }) => {
  const urlQuery = router.query && router.query.query;
  const [search, setSearch] = useState(urlQuery || "");

  const handleSearchChange = useCallback(
    e => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  const handleLogout = useCallback(
    e => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>登 出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
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
      <Footer style={footerStyle}>
        Develop by Jimmie @
        <a href="mailto:JimmieZhou@126.com">JimmieZhou@126.com</a>
      </Footer>
      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
};

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  function mapDispathToProps(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }
)(withRouter(MyLayout));

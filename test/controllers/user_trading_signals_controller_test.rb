require 'test_helper'

class UserTradingSignalsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_trading_signals_index_url
    assert_response :success
  end

  test "should get liked" do
    get user_trading_signals_liked_url
    assert_response :success
  end

  test "should get like" do
    get user_trading_signals_like_url
    assert_response :success
  end

  test "should get dislike" do
    get user_trading_signals_dislike_url
    assert_response :success
  end

end

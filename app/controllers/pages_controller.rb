class PagesController < ApplicationController
  def index
    @blogs = Blog.recent
    
    @tests_taken = TestScore.count
    score_counts = count_scores
    @percentages = calculate_percentages(score_counts, @tests_taken)
    
    @tests_taken = @percentages[:tests_taken]
    @unlikely_percentage = @percentages[:unlikely]
    @likely_percentage = @percentages[:likely]
  end

  def count_scores
    tests = TestScore.all
    {
      tests_taken: TestScore.count,
      unlikely:      tests.select{|score| get_test_bracket(score.score)==2 }.count,
      likely:        tests.select{|score| get_test_bracket(score.score)==3 }.count,
    }
  end
  
  def calculate_percentages(counts, total)
    counts.transform_values { |count| total > 0 ? (count.to_f / total * 100).round(2) : 0.0 }
  end
  
  
  def translations
  end

  def privacy_policy
  end

  def about
  end

  def faq
  end
end
